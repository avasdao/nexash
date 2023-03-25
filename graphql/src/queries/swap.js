/* Import types. */
// import Type from '../types/Type.js'

import {
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLSchema,
    GraphQLString,
} from 'graphql'

export default {
    type: GraphQLString,
    resolve: (_root, args, ctx) => {
        console.log('BLANK ARGS:', args)
        return 'Blank created successfully!'
    },
    description: `Blank description goes here.`,
}
