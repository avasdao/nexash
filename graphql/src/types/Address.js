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
        prefix: { type: new GraphQLNonNull(GraphQLString) },
        type: { type: new GraphQLNonNull(GraphQLInt) },
        hash: { type: new GraphQLNonNull(GraphQLString) },
        base58: { type: new GraphQLNonNull(GraphQLString) },
        publicKey: { type: GraphQLString },
        firstSeenAt: { type: GraphQLInt },
        txs: { type: new GraphQLList(TransactionType) },
    }),
    description: `An __Address__ provides a target (or destination) for receiving assets.`,
})
