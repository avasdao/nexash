/* Import types. */
import ScriptType from '../types/Script.js'
import TransactionType from '../types/Transaction.js'

import {
    // GraphQLBoolean,
    // GraphQLFloat,
    GraphQLList,
    // GraphQLNonNull,
    // GraphQLObjectType,
    // GraphQLInt,
    // GraphQLString,
} from 'graphql'

export default {
    type: new GraphQLList(TransactionType),
    args: {
        hash: {
            type: new GraphQLList(ScriptType),
            description: `Enter the __ScripHash__ for an on-chain Transaction.`,
        },
        prefix: {
            type: new GraphQLList(ScriptType),
            description: `Enter the __Nulldata (OP_RETURN) Prefix__ for an on-chain Transaction.`,
        },
    },
    resolve: (_root, _args, _ctx) => {
        console.log('Script (args):', _args)

        return [{
            txidem: '010203040506070809',
            blockhash: '010203040506070809',
            confirmations: 1,
            fee: 1337,
        }]
    },
    description: `Request information about on-chain __Script__ transactions, eg. _OP_RETURN_ and _CashFusion._`,
}
