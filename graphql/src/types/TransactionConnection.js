/* Import modules. */
import {
    // GraphQLBoolean,
    // GraphQLFloat,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLInt,
    // GraphQLString,
} from 'graphql'

/* Import types. */
import TransactionEdgeType from '../types/TransactionEdge.js'
import PageInfoType from '../types/PageInfo.js'

export default new GraphQLObjectType({
    name: 'TransactionConnection',
    fields: () => ({

        totalCount: {
            type: new GraphQLNonNull(GraphQLInt),
            description: `Total number of records available.`,
        },

        edges: {
            type: new GraphQLNonNull(new GraphQLList(TransactionEdgeType)),
            description: `Transaction Edge data.`,
        },

        pageInfo: {
            type: new GraphQLNonNull(PageInfoType),
            description: `Page info about the dataset.`,
        },

    }),
    description: `A __Transaction Edge__ description goes here.`,
})
