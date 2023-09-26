/* Import modules. */
import { callNode } from '@nexajs/rpc'

/* Set node options. */
const RPC_OPTIONS = {
    username: 'user', // required
    password: 'password', // required
    host: '127.0.0.1', // (optional) default is localhost (127.0.0.1)
    port: '7227', // (optional) default is 7227
}

/**
 * Get Block
 *
 * Retrieves the block information from the local node.
 */
export default async () => {
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
