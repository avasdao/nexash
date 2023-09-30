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
import EdgeType from '../types/Edge.js'
import PageInfoType from '../types/PageInfo.js'

export default new GraphQLObjectType({
    name: 'Connection',
    fields: () => ({

        totalCount: {
            type: new GraphQLNonNull(GraphQLInt),
            description: `Total number of records available.`,
        },

        edges: {
            type: new GraphQLNonNull(new GraphQLList(EdgeType)),
            description: `Edge data.`,
        },

        pageInfo: {
            type: new GraphQLNonNull(PageInfoType),
            description: `Page info about the dataset.`,
        },

    }),
    description: `A __Edge__ description goes here.`,
})
