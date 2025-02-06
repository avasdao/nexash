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

        scriptPubKey: {
            type: new GraphQLList(GraphQLString),
            description: `Filter by transaction Script Public Key as sender or receiver.`,
        },

    },

    subscribe: withFilter(
        () => _pubsub.asyncIterator('ADDRESS_UPDATE'),
        (_payload, _args) => {
            if (_payload?.address?.base58.slice(0, 14) === 'nexa:nqtsq5g5y') {
                console.log('SUBSCRIBE PAYLOAD', _payload)
                console.log('SUBSCRIBE ARGS', _args)
            }

            /* Validate filter arguments. */
            if (Object.keys(_args).length === 0) {
                return true
            }

            /* Initialize locals. */
            let hasMatch = false
            let base58
            let hash
            let profile

            /* Validate base58 arguments. */
            if (_args.base58) {
                base58 = Array.isArray(_args.base58) ? _args.base58 : [_args.base58]

                /* Validate base58. */
                base58.forEach(_base58 => {
                    if (_payload.address.base58 === _base58) {
                        hasMatch = true
                    }
                })
            }

            /* Validate hash arguments. */
            if (_args.hash) {
                hash = Array.isArray(_args.hash) ? _args.hash : [_args.hash]

                /* Validate hash. */
                hash.forEach(_hash => {
                    if (_payload.address.hash === _hash) {
                        hasMatch = true
                    }
                })
            }

            /* Validate profile arguments. */
            if (_args.profile) {
                profile = Array.isArray(_args.profile) ? _args.profile : [_args.profile]

                /* Validate profile. */
                profile.forEach(_profile => {
                    if (_payload.address.base58 === _profile) {
                        hasMatch = true
                    }
                })
            }

            console.log('hasMatch', hasMatch);
            /* Return false (no match). */
            return hasMatch
        }
    ),
    description: `This subscription will report __every Address action__ that appears on the blockchain.`,
})
