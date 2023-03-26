/* Import types. */
import AddressType from '../types/Address.js'

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
    type: new GraphQLList(AddressType),
    args: {
        base58: {
            type: new GraphQLList(GraphQLString),
            description: `Enter a __Base58__-formatted string.`,
        },
    },
    resolve: (_root, args, ctx) => {
        console.log('Address (args):', args)

        return [{
            base58: 'nexa:nqsome-random-address',
        }]
    },
    description: `An __Address__ provides a target (or destination) to receive Assets.`,
}
