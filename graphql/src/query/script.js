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
    type: new GraphQLList(GraphQLObjectType),
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

        return [
            new GraphQLObjectType({
                dust: '010203040506070809',
                opcode: _args.opcode,
                hex: _args.hex,
            },
        ]
    },
    description: `Request information about on-chain __Script__ transactions, eg. _OP_RETURN_ and _CashFusion._`,
}
