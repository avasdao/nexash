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
import ConnInfoType from '../types/ConnInfo.js'
import ProfileEdgeType from '../types/ProfileEdge.js'
import PageInfoType from '../types/PageInfo.js'

export default new GraphQLObjectType({
    name: 'ProfileConnection',
    fields: () => ({

        connInfo: {
            type: new GraphQLNonNull(ConnInfoType),
            description: `Connection info related to the dataset.`,
        },

        totalCount: {
            type: new GraphQLNonNull(GraphQLInt),
            description: `Total number of records available.`,
        },

        edges: {
            type: new GraphQLNonNull(new GraphQLList(ProfileEdgeType)),
            description: `Profile Edge data.`,
        },

        pageInfo: {
            type: new GraphQLNonNull(PageInfoType),
            description: `Page info about the dataset.`,
        },

    }),
    description: `A __Profile Edge__ description goes here.`,
})
