/* Import types. */
import TransactionType from './Transaction.js'

import {
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
} from 'graphql'

export default new GraphQLObjectType({
    name: 'Address',
    fields: () => ({

        prefix: {
            type: new GraphQLNonNull(GraphQLString),
            description: `TBD`,
        },

        type: {
            type: new GraphQLNonNull(GraphQLInt),
            description: `TBD`,
        },

        hash: {
            type: new GraphQLNonNull(GraphQLString),
            description: `TBD`,
        },

        base58: {
            type: new GraphQLNonNull(GraphQLString),
            description: `TBD`,
        },

        publicKey: {
            type: GraphQLString,
            description: `TBD`,
        },

        firstSeenAt: {
            type: GraphQLInt,
            description: `TBD`,
        },

        txs: {
            type: new GraphQLList(TransactionType),
            description: `TBD`,
        },

    }),
    description: `An __Address__ provides a target (or destination) for receiving assets.`,
})
