/* Import types. */
// import BlankType from '../types/Blank.js'

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
    type: new GraphQLList(GraphQLString),
    // args: {
    //     fieldName: {
    //         type: new GraphQLList(GraphQLString),
    //         description: `Field description goes here.`,
    //     },
    // },
    resolve: (_root, _args, _ctx) => {
        console.log('Blank (args):', _args)

        return [{
            field1: 'This is a BLANK asset!',
            field2: 1337,
            field3: 88888888,
        }]
    },
    description: `Blank description goes here.`,
}
