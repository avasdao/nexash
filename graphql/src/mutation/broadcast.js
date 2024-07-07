/* Import modules. */
import { callNode } from '@nexajs/rpc'

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
        if (response?.result) {
            /* Return (RPC request) result. */
            return JSON.stringify(response?.result)

            // TODO Handle `???`.
        } else {
            /* Return (RPC request) error. */
            return JSON.stringify(response.error)

            // TODO Handle `code` and `message`.
        }
    },
    description: `Broadcast a Nexa transaction to the network.`,
}
