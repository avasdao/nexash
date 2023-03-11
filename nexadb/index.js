/* Import modules. */
import { call } from '@nexajs/rpc'
import http from 'http'
import PouchDB from 'pouchdb'
import SSE from 'sse'
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

/* Initialize server. */
const server = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.end('okay')
})

/* Initialize client holder. */
let sseClients = {}

/* Handle server requests. */
server.listen(5000, '127.0.0.1', function () {
    /* Initialize server-side event server. */
    const sse = new SSE(server)

    /* Handle server connection. */
    sse.on('connection', function (_client) {
        // console.log('CLIENT', _client)
        console.log('CLIENT (headers)', _client?.req?.headers)
        /* Assign client to global holder. */
        // sseClient = _client

        /* Write entry to DB logs. */
        logsDb.put({
            _id: uuidv4(),
            source: 'mempool.nexa.sh',
            headers: _client?.req?.headers,
        })
        .catch(err => {
            console.error(err)
        })

        /* Send (server) greeting. */
        _client.send('hi there!')
    })
})

/**
 * Broadcast
 *
 * Sends a server-side event to every connect client.
 */
const broadcast = (_event) => {
    Object.keys(sseClients).forEach(_client => {
        /* Set client. */
        const client = sseClients[_client]

        /* Send event to client. */
        client.send(_event)
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
            broadcast(decoded)
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
