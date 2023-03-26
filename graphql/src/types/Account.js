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
    name: 'Account',
    fields: () => ({

        field1: {
            type: GraphQLString,
            description: `TBD`,
        },

        field2: {
            type: GraphQLInt,
            description: `TBD`,
        },

        field3: {
            type: GraphQLInt,
            description: `TBD`,
        },

    }),
    description: `An __Account__ provides a target (or destination) for receiving assets.`,
})
