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

/* Import helpers. */
import decodeRawTransaction from './utils/decodeRawTransaction.js'
import getBlock from './utils/getBlock.js'
import getBlockchainInfo from './utils/getBlockchainInfo.js'

/* Import indexers. */
import blocksIndexer from './indexer/blocks.js'
import groupsIndexer from './indexer/groups.js'
import nulldataIndexer from './indexer/nulldata.js'
import scriptsIndexer from './indexer/scripts.js'
import transactionsIndexer from './indexer/transactions.js'

/* Import handlers. */
import handleAddress from './handlers/address.js'
import handleGroup from './handlers/group.js'
import handleScript from './handlers/script.js'

/* Initialize databases. */
const blocksDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/blocks`)
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
const BLOCKCHAIN_UPDATE_INTERVAL = 60000

/* Initialize locals. */
let blockchainInfo

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

console.info('\n  Starting Nexa Database daemon...\n')

setInterval(async () => {
    /* Request Blockchain information. */
    blockchainInfo = await getBlockchainInfo()
    console.log('UPDATE: BLOCKCHAIN INFO', blockchainInfo)
}, BLOCKCHAIN_UPDATE_INTERVAL)

const manageBlocks = async () => {
    await blocksIndexer(blockchainInfo.blocks)
    setTimeout(manageBlocks, 1000)
}

const manageGroups = async () => {
    await groupsIndexer(blockchainInfo.blocks)
    setTimeout(manageGroups, 1000)
}

const manageNulldata = async () => {
    await nulldataIndexer(blockchainInfo.blocks)
    setTimeout(manageNulldata, 1000)
}

const manageScripts = async () => {
    await scriptsIndexer(blockchainInfo.blocks)
    setTimeout(manageScripts, 1000)
}

const manageTransactions = async () => {
    await transactionsIndexer(blockchainInfo.blocks)
    setTimeout(manageTransactions, 1000)
}

;(async () => {
    /* Initialize locals. */
    let decoded
    let msg
    let sock
    let topic
    let updatedSystem

    /* Request Blockchain information. */
    blockchainInfo = await getBlockchainInfo()
    console.log('BLOCKCHAIN INFO', blockchainInfo)

    if (!blockchainInfo.blocks) {
        throw new Error('Oops! No blockchain info received.')
    }

    /* Start (sync) database indexers. */
    manageBlocks()
    manageGroups()
    // manageNulldata()
    manageScripts()
    manageTransactions()

    /* Initialize Zero Message Queue (ZMQ) socket. */
    sock = new zmq.Subscriber

    /* Connect to local node. */
    sock.connect('tcp://127.0.0.1:28332')

    /* Subscribe to messages. */
    sock.subscribe()
    console.log(`Subscriber connected to port 28332`)

    /* Handle incoming messages. */
    for await (const [ _topic, _msg ] of sock) {
        /* Set topic. */
        topic = Buffer.from(_topic).toString()

        /* Set message. */
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

            /* Handle Script. */
            await handleScript(decoded)

            try {
                /* Broadcast event. */
                sse.send(decoded)
            } catch (err) {
                console.error(err)
            }
        }
    }
})()
