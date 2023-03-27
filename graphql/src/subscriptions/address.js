/* Import modules. */
import { withFilter } from 'graphql-subscriptions'

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
            description: `Filter by Address.`,
        },

        owner: {
            type: new GraphQLList(GraphQLString),
            description: `Filter by transaction Owner (address) as sender or receiver.`,
        },

    },

    subscribe: withFilter(() => _pubsub.asyncIterator('ADDRESS_UPDATE'), (_payload, _args) => {
        console.log('SUBSCRIBE PAYLOAD', _payload)
        console.log('SUBSCRIBE ARGS', _args)
        return true
        // return _payload.somethingChanged.id === _args.relevantId;
    }),
    // subscribe: (_root, args, ctx) => {
    //     console.log('SUBSCRIBE ROOT', _root)
    //     console.log('SUBSCRIBE ARGS', args)
    //     console.log('SUBSCRIBE CTX', ctx)
    //
    //     return _pubsub.asyncIterator(['ADDRESS_UPDATE'])
    // },
    description: `This subscription will report __every Address action__ that appears on the blockchain.`,
})
