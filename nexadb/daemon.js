/* Import modules. */
import { callNode } from '@nexajs/rpc'
import cors from 'cors'
import express from 'express'
import http from 'http'
import PouchDB from 'pouchdb'
import SSE from 'express-sse'
import { v4 as uuidv4 } from 'uuid'
import zmq from 'zeromq'

/* Initialize databases. */
const blocksDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/blocks`)
const logsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/logs`)
const statusDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/status`)
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
    /* Set method. */
    const method = 'decoderawtransaction'

    /* Set parameters. */
    const params = [_rawTx]

    /* Execute JSON-RPC request. */
    const response = await callNode(method, params, RPC_OPTIONS)
    // console.log('\nJSON-RPC response:\n%s', response)

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
    const response = await callNode(method, params, RPC_OPTIONS)
    // console.log('\nJSON-RPC response:\n%s', response)

    /* Return response. */
    return response
}

const getTransaction = async (_txidem) => {
    /* Set method. */
    const method = 'getrawtransaction'

    /* Set parameters. */
    const params = [_txidem, true]

    /* Execute JSON-RPC request. */
    const response = await callNode(method, params, RPC_OPTIONS)
    // console.log('\nJSON-RPC response:\n%s', response)

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
    const response = await callNode(method, params, RPC_OPTIONS)

    /* Return response. */
    return response
}

console.info('\n  Starting Nexa Database daemon...\n')


/**
 * Check Database Syncronization
 *
 * Performs a check to make sure we have indexed up to the
 * latest block height.
 */
const checkDbSync = async () => {
    console.info('\n  Checking database sync...\n')

    const system = await statusDb.get('system')
        .catch(err => console.error(err))
    console.log('SYSTEM', system)

    if (blockchainInfo?.blocks > system?.idxHeight) {
        console.log('\n\n  Starting database sycn...\n')

        for (let i = system.idxHeight; i <= blockchainInfo.blocks; i++) {
            if (i > 1) break

            /* Request block at height. */
            const block = await getBlock(i)
                .catch(err => {
                    console.error(err)
                })
            console.log(`BLOCK #${i}`, block)

            blocksDb.put({
                _id: block.height.toString(),
                ...block,
            })
            .catch(err => {
                console.error(err)
            })

            // NOTE: Block MUST contain at least the Coinbase transaction.
            if (block?.txidem) {
                for (let j = 0; j < block.txidem.length; j++) {
                    /* Set transaction idem. */
                    const txidem = block.txidem[j]

                    /* Request transaction details. */
                    const tx = await getTransaction(txidem)
                        .catch(err => {
                            console.error(err)
                        })
                    // console.log(`TRANSACTION [${txidem}]`, tx)

                    /* Save to storage. */
                    txsDb.put({
                        _id: tx.txidem,
                        ...tx
                    })
                    .catch(err => {
                        console.error(err)
                    })
                }
            }

        }
    }
}

;(async () => {

    blockchainInfo = await getBlockchainInfo()
    console.log('\n\n  Blockchain info:\n', blockchainInfo)

    const sock = new zmq.Subscriber

    sock.connect('tcp://127.0.0.1:28332')

    sock.subscribe()
    console.log(`Subscriber connected to port 28332`)

    for await (const [ _topic, _msg ] of sock) {
        const topic = Buffer.from(_topic).toString()
        const msg = Buffer.from(_msg).toString('hex')

        console.log('received a message related to:',
            topic,
            'containing message:',
            msg,
            '\n')

        if (topic === 'hashblock') {
            const decoded = await getBlock(msg)
                .catch(err => {
                    console.error(err)
                })
            console.log('DECODED', decoded)

            blocksDb.put({
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

        if (topic === 'rawtx') {
            const decoded = await decodeRawTransaction(msg)
                .catch(err => {
                    console.error(err)
                })
            console.log('DECODED', decoded)

            txsDb.put({
                _id: decoded.txidem,
                ...decoded
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
    }

})()

checkDbSync()
