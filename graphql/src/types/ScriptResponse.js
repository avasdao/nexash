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

export default new GraphQLObjectType({
    name: 'ScriptResponse',
    fields: () => ({

        totalCount: {
            type: GraphQLInt,
            description: `TBD`,
        },

        edges: {
            type: GraphQLString,
            description: `TBD`,
        },

        pageInfo: {
            type: GraphQLString,
            description: `TBD`,
        },

    }),
    description: `A __Blank__ description goes here.`,
})
