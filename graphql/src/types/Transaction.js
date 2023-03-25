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
    name: 'Transaction',
    fields: () => ({

        txidem: {
            type: GraphQLString,
            description: `The transaction idem.`
        },

        txid: {
            type: GraphQLString,
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

        // ...

        blocktime: {
            type: GraphQLInt,
            description: `The block time in seconds since epoch (Jan 1 1970 GMT).`
        },

        hex: {
            type: GraphQLString,
            description: `The serialized, hex-encoded data for 'txid'.`
        },

        /*{
  "in_txpool": false,
  "in_orphanpool": false,
  "spends": 0.00,
  "sends": 0.00,
  "fee": 0.00,
  "vin": [
  ],
  "vout": [
    {
      "value": 0.00,
      "type": 0,
      "n": 0,
      "scriptPubKey": {
        "asm": "0",
        "hex": "00",
        "type": "nonstandard"
      },
      "outpoint": "1bed9d880d0523818bd3f3bde7cd45733f28a96dfdea2b5c7328d6f433a97d42"
    },
    {
      "value": 0.00,
      "type": 0,
      "n": 1,
      "scriptPubKey": {
        "asm": "OP_RETURN 0 7227 526575746572733a204a6170616e20504d204b697368696461206261636b7320424f4a20756c7472612d6561737920706f6c696379207768696c652079656e20776f7272696573206d6f756e74204254433a3734313731313a30303030303030303030303030303030303030373566346263303865316437386133616233616638323734643133333334633061633264653235333039373638",
        "hex": "6a00023b1c4c99526575746572733a204a6170616e20504d204b697368696461206261636b7320424f4a20756c7472612d6561737920706f6c696379207768696c652079656e20776f7272696573206d6f756e74204254433a3734313731313a30303030303030303030303030303030303030373566346263303865316437386133616233616638323734643133333334633061633264653235333039373638",
        "type": "nulldata"
      },
      "outpoint": "3719996d2506c0032901d593b91b6a6ee7134128b26c054eafa26b23a9718127"
    }
  ],
  "blockhash": "edc7144fe1ba4edd0edf35d7eea90f6cb1dba42314aa85da8207e97c5339c801",
  "confirmations": 237231,
  "time": 1655812800,
}*/

    }),
    description: `A __Block__ contains the full details for a miner-submitted pool of Transaction(s) to be confirmed by the Network.`,
})
