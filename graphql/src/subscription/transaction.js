/* Import types. */
import TransactionType from '../types/Transaction.js'

import {
    GraphQLList,
    GraphQLString,
} from 'graphql'

export default (_pubsub) => ({
    type: TransactionType,
    args: {

        txidem: {
            type: new GraphQLList(GraphQLString),
            description: `Filter by transaction idem.`,
        },

        profile: {
            type: new GraphQLList(GraphQLString),
            description: `Filter by transaction Profile (by WPID) as sender or receiver.`,
        },

    },
    subscribe: () => _pubsub.asyncIterator(['NEW_TRANSACTION']),
    description: `This subscription will report __every new transaction__ that appears on the blockchain.`,
})
