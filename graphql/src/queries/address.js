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
    resolve: (_root, _args, _ctx) => {
        console.log('Address (args):', _args)

        return [{
            base58: 'nexa:nqsome-random-address',
            owner: 'nexa:nqsome-random-address',
        }]
    },
    description: `An __Address__ provides a target (or destination) to receive Assets.`,
}
