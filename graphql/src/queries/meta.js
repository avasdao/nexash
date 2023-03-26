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
    args: {
        chainid: {
            type: new GraphQLList(GraphQLString),
            description: `Specify the __Chain ID__ for your desired network.`,
        },
    },
    resolve: (_root, args, ctx) => {
        console.log('Blank (args):', args)

        return [JSON.stringify({
            field1: 'This is a META asset!',
            field2: 1337,
            field3: 88888888,
        })]
    },
    description: `Request (unstructured) __Meta__ data from Networks outside of Nexa (incl. BSC, ETH and TRX.`,
}
