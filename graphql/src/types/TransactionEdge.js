/* Import modules. */
import {
    // GraphQLBoolean,
    // GraphQLFloat,
    // GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    // GraphQLInt,
    GraphQLString,
} from 'graphql'

/* Import types. */
import TransactionType from '../types/Transaction.js'

export default new GraphQLObjectType({
    name: 'TransactionEdge',
    fields: () => ({

        node: {
            type: new GraphQLNonNull(TransactionType),
            description: `TBD`,
        },

        cursor: {
            type: GraphQLString,
            description: `TBD`,
        },

    }),
    description: `A __Transaction Edge__ description goes here.`,
})
