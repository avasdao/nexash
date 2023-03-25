import {
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLSchema,
    GraphQLString,
} from 'graphql'

export default new GraphQLObjectType({
    name: 'Block',
    fields: () => ({

        hash: {
            type: new GraphQLNonNull(GraphQLString),
            description: `The block hash. [ a 32-btye hex value ]`
        },

        confirmations: {
            type: GraphQLInt,
            description: `The number of confirmations, or -1 if the block is not on the main chain.`
        },

        height: {
            type: GraphQLInt,
            description: `The block height or index.`
        },

        size: {
            type: GraphQLInt,
            description: `The block size.`
        },

        txcount: {
            type: GraphQLInt,
            description: `The number of transactions in the block.`
        },

        feePoolAmt: {
            type: GraphQLInt,
            description: `TBD`
        },

        merkleroot: {
            type: GraphQLString,
            description: `TBD`
        },

        time: {
            type: GraphQLInt,
            description: `TBD`
        },

        mediantime: {
            type: GraphQLInt,
            description: `TBD`
        },

        nonce: {
            type: GraphQLString,
            description: `TBD`
        },

        bits: {
            type: GraphQLString,
            description: `TBD`
        },

        difficulty: {
            type: GraphQLFloat,
            description: `TBD`
        },

        chainwork: {
            type: GraphQLString,
            description: `TBD`
        },

        utxoCommitment: {
            type: GraphQLString,
            description: `TBD`
        },

        minerData: {
            type: GraphQLString,
            description: `TBD`
        },

        status: {
            type: GraphQLString,
            description: `TBD`
        },

        onMainChain: {
            type: GraphQLBoolean,
            description: `TBD`
        },

        ancestorhash: {
            type: GraphQLString,
            description: `TBD`
        },

        nextblockhash: {
            type: GraphQLString,
            description: `TBD`
        },

        txid: {
            type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
            description: `The transaction ids.`
        },

        txidem: {
            type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
            description: `The transaction idems.`
        },
    }),
    description: `A __Block__ contains the full details for a miner-submitted pool of Transaction(s) to be confirmed by the Network.`,
})
