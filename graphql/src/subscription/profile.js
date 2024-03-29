/* Import types. */
import ProfileType from '../types/Profile.js'

import {
    GraphQLList,
    GraphQLString,
} from 'graphql'

export default (_pubsub) => ({
    type: ProfileType,
    args: {

        base58: {
            type: new GraphQLList(GraphQLString),
            description: `Filter by transaction idem.`,
        },

        scriptPubKey: {
            type: new GraphQLList(GraphQLString),
            description: `Filter by transaction Script Public Key as sender or receiver.`,
        },

    },
    subscribe: () => _pubsub.asyncIterator(['PROFILE_UPDATE']),
    description: `This subscription will report __every Profile action__ that appears on the blockchain.`,
})
