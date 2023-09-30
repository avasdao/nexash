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
import EdgeType from '../types/Edge.js'
import PageInfoType from '../types/PageInfo.js'

export default new GraphQLObjectType({
    name: 'Connection',
    fields: () => ({

        totalCount: {
            type: GraphQLInt,
            description: `TBD`,
        },

        edges: {
            type: EdgeType,
            description: `TBD`,
        },

        pageInfo: {
            type: PageInfoType,
            description: `TBD`,
        },

    }),
    description: `A __Blank__ description goes here.`,
})
