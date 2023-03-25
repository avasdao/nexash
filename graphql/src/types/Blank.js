/* Import types. */
// import Type from '../types/Type.js'

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
    name: 'Blank',
    fields: () => ({
        field1: { type: GraphQLString },
        field2: { type: GraphQLInt },
        field3: { type: GraphQLInt },
    }),
    description: `A __Blank__ description goes here.`,
})
