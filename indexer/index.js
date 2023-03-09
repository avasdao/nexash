/* Import modules. */
import { call } from '@nexajs/rpc'
import zmq from 'zeromq'

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
}

console.info('\n  Starting Nexa Shell (Indexer) daemon...\n')

;(async () => {
    await getBlockchainInfo()

    const sock = new zmq.Subscriber

    sock.connect('tcp://127.0.0.1:28332')

    sock.subscribe()
    console.log(`Subscriber connected to port 28332`)

    for await (const [ topic, msg ] of sock) {
        console.log('received a message related to:', Buffer.from(topic).toString(), 'containing message:', Buffer.from(msg).toString('hex'), '\n')
    }

})()
