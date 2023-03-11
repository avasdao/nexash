/* Import modules. */
import { call } from '@nexajs/rpc'
import cors from 'cors'
import express from 'express'
import http from 'http'
import PouchDB from 'pouchdb'
import SSE from 'express-sse'
import { v4 as uuidv4 } from 'uuid'
import zmq from 'zeromq'

/* Initialize databases. */
const logsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/logs`)
const blocksDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/blocks`)
const txsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/txs`)

/* Set node options. */
const RPC_OPTIONS = {
    username: 'user', // required
    password: 'password', // required
    host: '127.0.0.1', // (optional) default is localhost (127.0.0.1)
    port: '7227', // (optional) default is 7227
}

/* Set constants. */
const LOCAL_HOST = '127.0.0.1'
const SSE_PORT = process.env.SSE_PORT || 5000

const welcomeMsg = 'Nexa memory pool firehose!'

const sse = new SSE([ welcomeMsg ])

const app = express()

/* Enable CORS. */
app.use(cors())

/* Initialize data stream endpoint. */
app.get('/stream', esse.init)

/* Handle default endpoint. */
app.get('/', (req, res) => {
    res.send(welcomeMsg)
})

/* Start listening. */
app.listen(SSE_PORT, LOCAL_HOST, () => {
    console.log(`Express SSE listening on port ${SSE_PORT}`)
})

/**
 * Broadcast
 *
 * Sends a server-side event to every connect client.
 */
const broadcast = (_event) => {

    /* Broadcast via SSE pool. */
    Object.keys(sseClients).forEach(_client => {
        /* Set client. */
        const client = sseClients[_client]

        /* Validate client. */
        if (client) {
            /* Send event to client. */
            client.send(JSON.stringify(_event))
        }
    })
}

const decodeRawTransaction = async (_rawTx) => {
    /* Set method. */
    const method = 'decoderawtransaction'

    /* Set parameters. */
    const params = [_rawTx]

    /* Execute JSON-RPC request. */
    const response = await call(method, params, RPC_OPTIONS)
    console.log('\nJSON-RPC response:\n%s', response)

    /* Return response. */
    return response
}

const getBlock = async (_blockHash) => {
    /* Set method. */
    const method = 'getblock'

    /* Set parameters. */
    const params = [_blockHash]

    /* Set node options. */
    const options = {
        username: 'user', // required
        password: 'password', // required
        host: '127.0.0.1', // (optional) default is localhost (127.0.0.1)
        port: '7227', // (optional) default is 7227
    }

    /* Execute JSON-RPC request. */
    const response = await call(method, params, RPC_OPTIONS)
    console.log('\nJSON-RPC response:\n%s', response)

    /* Return response. */
    return response
}

const getBlockchainInfo = async () => {
    /* Set method. */
    const method = 'getblockchaininfo'

    /* Set parameters. */
    const params = []

    /* Set node options. */
    const options = {
        username: 'user', // required
        password: 'password', // required
        host: '127.0.0.1', // (optional) default is localhost (127.0.0.1)
        port: '7227', // (optional) default is 7227
    }

    /* Execute JSON-RPC request. */
    const response = await call(method, params, RPC_OPTIONS)
    console.log('\nJSON-RPC response:\n%s', response)

    /* Return response. */
    return response
}

console.info('\n  Starting Nexa Shell (Indexer) daemon...\n')

;(async () => {
    await getBlockchainInfo()

    const sock = new zmq.Subscriber

    sock.connect('tcp://127.0.0.1:28332')

    sock.subscribe()
    console.log(`Subscriber connected to port 28332`)

    for await (const [ _topic, _msg ] of sock) {
        const topic = Buffer.from(_topic).toString()
        const msg = Buffer.from(_msg).toString('hex')

        console.log('received a message related to:', topic, 'containing message:', msg, '\n')

        if (topic === 'hashblock') {
            const decoded = await getBlock(msg)
            console.log('DECODED', decoded)

            blocksDb.put({
                _id: decoded.height.toString(),
                ...decoded,
            })
            .catch(err => {
                console.error(err)
            })

            /* Broadcast event. */
            sse.send(decoded)
        }

        if (topic === 'rawtx') {
            const decoded = await decodeRawTransaction(msg)
            console.log('DECODED', decoded)

            txsDb.put({
                _id: decoded.txidem,
                ...decoded
            })
            .catch(err => {
                console.error(err)
            })

            /* Broadcast event. */
            broadcast(decoded)
        }
    }

})()
