/* Import types. */
import AddressType from './AddressType.js'
import TransactionType from './Transaction.js'

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
    name: 'Address',
    fields: () => ({

        prefix: {
            type: new GraphQLNonNull(GraphQLString),
            description: `The __prefix__ for the _Address_. _(eg. "nexa:")_`,
        },

        type: {
            type: new GraphQLNonNull(AddressType),
            description: `The __type__ for the _Address._`,
        },

        hash: {
            type: new GraphQLNonNull(GraphQLString),
            description: `The __public key template hash__ for the _Address._`,
        },

        base58: {
            type: new GraphQLNonNull(GraphQLString),
            description: `The __human-readable__ format of the _Address._`,
        },

        owner: {
            type: GraphQLString,
            description: `The __human-readable__ format of the _Address._`,
        },

        publicKey: {
            type: GraphQLString,
            description: `The public key for the Address. _(NOTE: Not available until after 1st broadcast)_`,
        },

        firstSeenAt: {
            type: GraphQLInt,
            description: `The __height__ that first recorded this _Address_ to the blockchain.`,
        },

        txidem: {
            type: GraphQLString,
            description: `The __Transaction Idem__ of the _Transaction_ containing the address.`,
        },

        hex: {
            type: GraphQLString,
            description: `The __(Raw) Hex__ for the _Transaction_ containing the address.`,
        },

    }),
    description: `An __Address__ provides a target (or destination) for receiving assets.`,
})
