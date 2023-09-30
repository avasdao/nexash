/* Import types. */
// import BlankType from './Blank.js'

import {
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
} from 'graphql'

/* Import types. */
import TransactionType from '../types/Transaction.js'

export default new GraphQLObjectType({
    name: 'Edge',
    fields: () => ({

        node: {
            type: new GraphQLList(TransactionType),
            description: `TBD`,
        },

        cursor: {
            type: GraphQLString,
            description: `TBD`,
        },

    }),
    description: `A __Blank__ description goes here.`,
})
