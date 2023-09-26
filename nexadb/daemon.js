/* Import modules. */
import { callNode } from '@nexajs/rpc'
import cors from 'cors'
import express from 'express'
import http from 'http'
import moment from 'moment'
import PouchDB from 'pouchdb'
import SSE from 'express-sse'
import { v4 as uuidv4 } from 'uuid'
import zmq from 'zeromq'

/* Import indexers. */
import blocksIndexer from './indexer/blocks.js'
import handleGroup from './handlers/group.js'

/* Import handlers. */
import handleAddress from './handlers/address.js'
import handleGroup from './handlers/group.js'

/* Initialize databases. */
const blocksDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/blocks`)
const logsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/logs`)
const systemDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/system`)
const transactionsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/transactions`)

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

/* Initialize locals. */
let blockchainInfo
let response

/* Set welcome message. */
const welcomeMsg = 'Nexa memory pool firehose!'

/* Initialize server-side event handler. */
const sse = new SSE([ welcomeMsg ])

/* Initialize Express app. */
const app = express()

/* Enable CORS. */
app.use(cors())

/* Initialize data stream endpoint. */
app.get('/stream', sse.init)

/* Handle default endpoint. */
app.get('/', (req, res) => {
    res.send(welcomeMsg)
})

/* Start listening. */
app.listen(SSE_PORT, LOCAL_HOST, () => {
    console.log(`Express SSE listening on port ${SSE_PORT}`)
})

const decodeRawTransaction = async (_rawTx) => {
    let method
    let params
    let response

    /* Set method. */
    method = 'decoderawtransaction'

    /* Set parameters. */
    params = [_rawTx]

    /* Execute JSON-RPC request. */
    response = await callNode(method, params, RPC_OPTIONS)
    // console.log('\nJSON-RPC response:\n%s', response)

    /* Return response. */
    return response
}

const getBlock = async (_blockHash) => {
    let method
    let options
    let params
    let response

    /* Set method. */
    method = 'getblock'

    /* Set parameters. */
    params = [_blockHash]

    /* Set node options. */
    options = {
        username: 'user', // required
        password: 'password', // required
        host: '127.0.0.1', // (optional) default is localhost (127.0.0.1)
        port: '7227', // (optional) default is 7227
    }

    /* Execute JSON-RPC request. */
    response = await callNode(method, params, RPC_OPTIONS)
    // console.log('\nJSON-RPC response:\n%s', response)

    /* Return response. */
    return response
}

const getTransaction = async (_txidem) => {
    let method
    let params
    let response

    /* Set method. */
    method = 'getrawtransaction'

    /* Set parameters. */
    params = [_txidem, true]

    /* Execute JSON-RPC request. */
    response = await callNode(method, params, RPC_OPTIONS)
    // console.log('\nJSON-RPC response:\n%s', response)

    /* Return response. */
    return response
}

const getBlockchainInfo = async () => {
    let method
    let options
    let params
    let response

    /* Set method. */
    method = 'getblockchaininfo'

    /* Set parameters. */
    params = []

    /* Set node options. */
    options = {
        username: 'user', // required
        password: 'password', // required
        host: '127.0.0.1', // (optional) default is localhost (127.0.0.1)
        port: '7227', // (optional) default is 7227
    }

    /* Execute JSON-RPC request. */
    response = await callNode(method, params, RPC_OPTIONS)

    /* Return response. */
    return response
}

console.info('\n  Starting Nexa Database daemon...\n')




;(async () => {
    let decoded
    let msg
    let sock
    let topic
    let updatedSystem

    /* Request Blockchain information. */
    blockchainInfo = await getBlockchainInfo()
    console.log('\n\n  Blockchain info:\n', blockchainInfo)

    /* Check database sync. */
    blocksIndexer()

    /* Initialize Zero Message Queue (ZMQ) socket. */
    sock = new zmq.Subscriber

    /* Connect to local node. */
    sock.connect('tcp://127.0.0.1:28332')

    /* Subscribe to messages. */
    sock.subscribe()
    console.log(`Subscriber connected to port 28332`)

    /* Handle incoming messages. */
    for await (const [ _topic, _msg ] of sock) {
        topic = Buffer.from(_topic).toString()
        msg = Buffer.from(_msg).toString('hex')

        /* Handle hash block. */
        if (topic === 'hashblock') {
            decoded = await getBlock(msg)
                .catch(err => {
                    console.error(err)
                })
            // console.log('DECODED', decoded)

            await blocksDb
                .put({
                    _id: decoded.height.toString(),
                    ...decoded,
                })
                .catch(err => {
                    console.error(err)
                })

            try {
                /* Broadcast event. */
                sse.send(decoded)
            } catch (err) {
                console.error(err)
            }
        }

        /* Handle raw transaction. */
        if (topic === 'rawtx') {
            decoded = await decodeRawTransaction(msg)
                .catch(err => {
                    console.error(err)
                })
            // console.log('DECODED', decoded)

            await transactionsDb
                .put({
                    _id: decoded.txidem,
                    ...decoded
                })
                .catch(err => {
                    console.error(err)
                })

            /* Handle Address. */
            await handleAddress(decoded)

            /* Handle Group (Tokens). */
            await handleGroup(decoded)

            try {
                /* Broadcast event. */
                sse.send(decoded)
            } catch (err) {
                console.error(err)
            }
        }
    }

})()
