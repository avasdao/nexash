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
export default async (_rawTx) => {
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
