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

export default {
    type: GraphQLString,
    // args: {
    //     fieldName: {
    //         type: GraphQLString,
    //         description: `Field description goes here.`,
    //     },
    // },
    resolve: (_root, args, ctx) => {
        console.log('BLANK ARGS:', args)

        return {
            field1: 'This is a BLANK asset!',
            field2: 1337,
            field3: 88888888,
        }
    },
    description: `Blank description goes here.`,
}
