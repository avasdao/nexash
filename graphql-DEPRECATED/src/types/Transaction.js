/* Import modules. */
import {
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
} from 'graphql'

/* Import types. */
import TransactionInputType from './TransactionInput.js'
import TransactionOutputType from './TransactionOutput.js'

export default new GraphQLObjectType({
    name: 'Transaction',
    fields: () => ({

        txidem: {
            type: new GraphQLNonNull(GraphQLString),
            description: `The transaction idem.`
        },

        txid: {
            type: new GraphQLNonNull(GraphQLString),
            description: `The transaction id.`
        },

        confirmations: {
            type: GraphQLInt,
            description: `The number of confirmations, or -1 if the block is not on the main chain.`
        },

        size: {
            type: GraphQLInt,
            description: `The block size.`
        },

        version: {
            type: GraphQLInt,
            description: `The version (currently always 0).`
        },

        locktime: {
            type: GraphQLInt,
            description: `The lock time.`
        },

        spends: {
            type: GraphQLFloat,
            description: `TBD`
        },

        sends: {
            type: GraphQLFloat,
            description: `TBD`
        },

        fee: {
            type: GraphQLFloat,
            description: `TBD`
        },

        vin: {
            type: new GraphQLNonNull(new GraphQLList(TransactionInputType)),
            description: `TBD`
        },

        vout: {
            type: new GraphQLNonNull(new GraphQLList(TransactionOutputType)),
            description: `TBD`
        },

        blockhash: {
            type: GraphQLString,
            description: `TBD`
        },

        confirmations: {
            type: GraphQLInt,
            description: `TBD`
        },

        time: {
            type: GraphQLInt,
            description: `TBD`
        },

        blocktime: {
            type: GraphQLInt,
            description: `The block time in seconds since epoch (Jan 1 1970 GMT).`
        },

        hex: {
            type: new GraphQLNonNull(GraphQLString),
            description: `The serialized, hex-encoded data for 'txid'.`
        },

    }),
    description: `A __Transaction__ contains the full details for a user-submitted Asset transfer to be confirmed by the Network.`,
})
