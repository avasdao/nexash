/* Import types. */
import AddressType from '../types/Address.js'

import {
    GraphQLList,
    GraphQLString,
} from 'graphql'

export default (_pubsub) => ({
    type: AddressType,
    args: {

        base58: {
            type: new GraphQLList(GraphQLString),
            description: `Filter by transaction idem.`,
        },

        owner: {
            type: new GraphQLList(GraphQLString),
            description: `Filter by transaction Owner (address) as sender or receiver.`,
        },

    },
    subscribe: () => _pubsub.asyncIterator(['ADDRESS_UPDATE']),
    description: `This subscription will report __every Address action__ that appears on the blockchain.`,
})
