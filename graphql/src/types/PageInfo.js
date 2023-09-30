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
    name: 'PageInfo',
    fields: () => ({

        startCursor: {
            type: GraphQLString,
            description: `TBD`,
        },

        endCursor: {
            type: GraphQLString,
            description: `TBD`,
        },

        hasNextPage: {
            type: GraphQLBoolean,
            description: `TBD`,
        },

        hasPreviousPage: {
            type: GraphQLBoolean,
            description: `TBD`,
        },

    }),
    description: `A __Blank__ description goes here.`,
})
