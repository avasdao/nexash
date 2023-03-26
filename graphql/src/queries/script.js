/* Import types. */
// import BlankType from '../types/Blank.js'

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
            type: new GraphQLList(GraphQLString),
            description: `Enter the __Prefix__ for an on-chain Script.`,
        },
    },
    resolve: (_root, args, ctx) => {
        console.log('Script (args):', args)

        return ['010203040506070809']
    },
    description: `Request information about on-chain __Script__ transactions, eg. OP_RETURN and CashFusion.`,
}
