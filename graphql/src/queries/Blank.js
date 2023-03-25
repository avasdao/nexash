/* Import types. */
import BlockType from '../types/Block.js'

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
    // args: {
    //     fieldName: {
    //         type: GraphQLString,
    //         description: `Field description goes here.`,
    //     },
    // },
    resolve: (parent, args, params) => {
        console.log('Blank (args):', args)
        return 'Blank created successfully!'
    },
    description: `Blank description goes here.`,
}
