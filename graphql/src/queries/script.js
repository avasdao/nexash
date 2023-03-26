/* Import types. */
import ScriptType from '../types/Script.js'

import {
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
} from 'graphql'

export default {
    type: new GraphQLList(GraphQLString),
    args: {
        prefix: {
            type: new GraphQLList(ScriptType),
            description: `Enter the __Prefix__ for an on-chain Script.`,
        },
    },
    resolve: (_root, args, ctx) => {
        console.log('Script (args):', args)

        return ['010203040506070809']
    },
    description: `Request information about on-chain __Script__ transactions, eg. _OP_RETURN_ and _CashFusion._`,
}
