/* Import types. */
import NetworkIdType from '../types/NetworkId.js'

import {
    GraphQLBoolean,
    GraphQLEnumType,
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
        networkid: {
            type: NetworkIdType,
            description: `Specify the __Chain ID__ for your desired network.`,
        },

        request: {
            type: new GraphQLList(GraphQLString),
            description: `Provide serialized __Request(s)__ to be processed by Meta networks.`,
        },
    },
    resolve: (_root, args, ctx) => {
        console.log('MMeta (args):', args)

        return [JSON.stringify({
            field1: 'This is a META asset!',
            field2: 1337,
            field3: 88888888,
        })]
    },
    description: `Request _(unstructured)_ __Meta__ data from Networks outside of the Nexa Core blockchain _(incl. Binance, Ethereum and Tron)._`,
}
