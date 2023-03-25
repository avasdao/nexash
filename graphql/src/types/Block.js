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
            type: GraphQLString,
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

        /*{
          : 370,
          : 1,
          feePoolAmt: 0,
          merkleroot: '9173ec5d14df32ea30470ef85770aeaab8faf046e58e8c61944b1fe422b5afcd',
          time: 1655812800,
          mediantime: 1655812800,
          nonce: '03001700',
          bits: '1e010000',
          difficulty: 0.003906190395355225,
          chainwork: '0000000000000000000000000000000000000000000000000000000000ffffff',
          utxoCommitment: '',
          minerData: '',
          status: 'valid header, tree, and transactions; has data; processed, linked',
          onMainChain: true,
          ancestorhash: '0000000000000000000000000000000000000000000000000000000000000000',
          nextblockhash: '9bd9f36759a53aa3dd5d979bd587b6a6808230b4b079e30d93e5da637f2fe59d',
          txid: [
            '9173ec5d14df32ea30470ef85770aeaab8faf046e58e8c61944b1fe422b5afcd'
          ],
          txidem: [
            '17c6bd3bbf76c3225482a370f4eda4c63f894e0ed00a75b223f7b91875f292e1'
          ]
      }*/

    }),
    description: `A __Block__ contains the full details for a miner-submitted pool of Transaction(s) to be confirmed by the Network.`,
})
