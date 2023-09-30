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
import OwnerEdgeType from '../types/OwnerEdge.js'
import PageInfoType from '../types/PageInfo.js'

export default new GraphQLObjectType({
    name: 'OwnerConnection',
    fields: () => ({

        totalCount: {
            type: new GraphQLNonNull(GraphQLInt),
            description: `Total number of records available.`,
        },

        edges: {
            type: new GraphQLNonNull(new GraphQLList(OwnerEdgeType)),
            description: `Owner Edge data.`,
        },

        pageInfo: {
            type: new GraphQLNonNull(PageInfoType),
            description: `Page info about the dataset.`,
        },

    }),
    description: `A __Owner Edge__ description goes here.`,
})
