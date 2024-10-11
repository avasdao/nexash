/* Import modules. */
// import { callNode } from '@nexajs/rpc'

import {
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLSchema,
    GraphQLString,
} from 'graphql'

const callNode = async (_method, _params, _options) => {
    /* Verify authentication. */
    if (!username && !password && !_options) {
        throw new Error('Oops! You have to connect to the local host first.')
    }

    if (_options) {
        username = _options.username || null
        password = _options.password || null
        host = _options.host || '127.0.0.1'
        port = _options.port || '7227'
    }

    if (!username || !password) {
        throw new Error('Oops! You MUST provide a username and password to connect to the node.')
    }

    /* Initialize (local) variables. */
    let endpoint
    let error
    let response

    try {
        /* Set endpoint. */
        // endpoint = `http://${username}:${password}@${host}:${port}`
        endpoint = `http://${host}:${port}`
        // console.log('ENDPOINT', endpoint)

        /* Build package. */
        const pkg = {
            "jsonrpc": "2.0",
            "id": "core",
            "method": _method,
            "params": _params,
        }
        // console.log('PKG', pkg)

        /* Set method. */
        const method = 'POST'

        /* Set headers. */
        const headers = new Headers()
        headers.append('Authorization', `Basic ${btoa(username + ':' + password)}`)
        headers.append('Content-Type', 'application/json')

        /* Make request. */
        response = await fetch(endpoint, {
            method,
            headers,
            body: JSON.stringify(pkg),
        }).catch(_err => {
            console.error('ERROR!', _err)

            if (_err && _err.response && _err.response.text) {
                error = JSON.parse(_err.response.text)
            } else if (_err && _err.response) {
                error = _err.response
            } else {
                error = _err
            }
        })

        /* Validate error. */
        if (error) {
            return error
        }

        /* Decode response. */
        response = await response.json()
        console.log('RESONSE', response)

        /* Validate response. */
        if (!response) {
            return null
        }
        // console.log('\nRPC CALL (response):', response)

        /* Validate response. */
        if (response && response.result) {
            return response.result
        } else {
            return null
        }
    } catch (err) {
        return err
    }
}

export default {
    type: GraphQLString,
    args: {
        hexstring: {
            type: GraphQLString,
            description: `Provide a hex-encoded (raw) transaction.`,
        },
    },
    resolve: async (_root, args, ctx) => {
        console.log('BROADCAST ARGS:', args)

        /* Initialize locals. */
        let bytecode
        let response
        let result

        /* Set bytecode. */
        bytecode = args?.hexstring

        // TODO Perform error-handling.

        /* Send raw transaction. */
        response = await callNode('sendrawtransaction', [bytecode], {
            username: process.env.RPC_USERNAME || 'user',
            password: process.env.RPC_PASSWORD || 'password',
            port: process.env.RPC_PORT || 7227,
        })
        .catch(err => console.error(err))
        console.log('NODE RESPONSE', response)

        /* Handle response. */
        if (response?.error) {
            /* Return (RPC request) error. */
            // TODO Handle error. `code` and `message`.
            // { code: -27, message: 'transaction already in block chain' }
            return response?.error?.message || 'Unknown node error'
            // return JSON.stringify(response?.result)
        } else {
            /* Return (RPC request) result. */
            // NOTE: This will return a 32-byte txidem.
            return response
        }
    },
    description: `Broadcast a Nexa transaction to the network.`,
}
