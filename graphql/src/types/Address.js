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

        txidem: {
            type: GraphQLString,
            description: `The __Transaction Idem__ of the _Transaction_ containing the address.`,
        },

        hex: {
            type: GraphQLString,
            description: `The __(Raw) Hex__ for the _Transaction_ containing the address.`,
        },

    }),
    description: `An __Address__ provides a target (or destination) for receiving assets.`,
})
