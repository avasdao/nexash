/* Import modules. */
import { call } from '@nexajs/rpc'
import PouchDB from 'pouchdb'
import zmq from 'zeromq'

/* Initialize databases. */
// const logsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/logs`)
const blocksDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/blocks`)
const txsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/txs`)


const decodeRawTransaction = async (_rawTx) => {
    /* Set method. */
    const method = 'decoderawtransaction'

    /* Set parameters. */
    const params = [_rawTx]

    /* Set node options. */
    const options = {
        username: 'user', // required
        password: 'password', // required
        host: '127.0.0.1', // (optional) default is localhost (127.0.0.1)
        port: '7227', // (optional) default is 7227
    }

    /* Execute JSON-RPC request. */
    const response = await call(method, params, options)
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
    const response = await call(method, params, options)
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
        }
    }

})()
