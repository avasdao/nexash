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


/**
 * Check Database Syncronization
 *
 * Performs a check to make sure we have indexed up to the
 * latest block height.
 */
const checkDbSync = async () => {
    console.info('\n  Checking database sync...\n')

    let block
    let system
    let tx
    let txidem
    let updatedSystem

    system = await systemDb
        .get('0')
        .catch(err => console.error(err))
    // console.log('SYSTEM', system)

    if (blockchainInfo?.blocks > system?.idxHeight) {
        console.info('\n  Starting database sycn...\n')

        /* Handle new blocks. */
        for (let i = system.idxHeight + 1; i <= blockchainInfo.blocks; i++) {
            /* Request block at height. */
            block = await getBlock(i)
                .catch(err => {
                    console.error(err)
                })
            // console.log(`BLOCK #${i}`, block)

            /* Save block to storage. */
            // await blocksDb
            //     .put({
            //         _id: block.height.toString(),
            //         ...block,
            //     })
            //     .catch(err => {
            //         console.error(err)
            //     })

            // NOTE: Block MUST contain at least the Coinbase transaction.
            if (block?.txidem) {
                for (let j = 0; j < block.txidem.length; j++) {
                    /* Set transaction idem. */
                    txidem = block.txidem[j]

                    /* Request transaction details. */
                    tx = await getTransaction(txidem)
                        .catch(err => {
                            console.error(err)
                        })
                    // console.log(`TRANSACTION [${txidem}]`, tx)

                    /* Save transaction to storage. */
                    // await transactionsDb
                    //     .put({
                    //         _id: tx.txidem,
                    //         ...tx
                    //     })
                    //     .catch(err => {
                    //         console.error(err)
                    //     })

                    /* Handle Address. */
                    // await handleAddress(tx)

                    /* Handle Group (Tokens). */
                    await handleGroup(tx)
                }
            }

            /* Retrieve (latest) System status. */
            updatedSystem = await systemDb
                .get('0')
                .catch(err => console.error(err))
            // console.log('UPDATED SYSTEM', system)

            /* Set new indexed height. */
            updatedSystem.idxHeight = i
            updatedSystem.updatedAt = moment().unix()

            /* Save (updated) System status to storage. */
            await systemDb
                .put(updatedSystem)
                .catch(err => console.error(err))
        }
    }
}

;(async () => {
    let decoded
    let msg
    let sock
    let topic
    let updatedSystem

    /* Request Blockchain information. */
    blockchainInfo = await getBlockchainInfo()
    console.log('\n\n  Blockchain info:\n', blockchainInfo)

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

        // console.log('received a message related to:',
        //     topic,
        //     'containing message:',
        //     msg,
        //     '\n')

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

            /* Retrieve (latest) System status. */
            updatedSystem = await systemDb
                .get('0')
                .catch(err => console.error(err))
            // console.log('UPDATED SYSTEM', system)

            /* Set new indexed height. */
            updatedSystem.idxHeight = parseInt(decoded.height)
            updatedSystem.updatedAt = moment().unix()

            /* Save (updated) System status to storage. */
            await systemDb
                .put(updatedSystem)
                .catch(err => console.error(err))
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

checkDbSync()
