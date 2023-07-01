/* Import modules. */
import PouchDB from 'pouchdb'

/* Initialize databases. */
const blocksDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/blocks`)
const logsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/logs`)

/* Import types. */
import BlockType from '../types/Block.js'

import {
    GraphQLInt,
    GraphQLList,
    GraphQLString,
} from 'graphql'

export default {
    type: new GraphQLList(BlockType),
    args: {
        hash: {
            type: new GraphQLList(GraphQLString),
            description: `Provide a __Block__ hash.`,
        },
        height: {
            type: new GraphQLList(GraphQLInt),
            description: `Provide a __Block__ height.`,
        },
    },
    resolve: async (_root, _args, _ctx) => {
        // console.log('Block (args):', _args)

        /* Initialize block. */
        let block = null

        /* Validate block hash. */
        if (!block && args?.hash) {
            block = await blocksDb
                .query('api/byHash', {
                    key: args.hash[0],
                })
                .catch(err => console.error(err))
            // console.log('BLOCK (by hash):', block)
        }

        /* Validate block height. */
        if (!block && args?.height.length) {
            // NOTE: We MUST convert height (Int) to a (String).
            block = await blocksDb.get(args.height[0].toString())
                .catch(err => console.error(err))
            // console.log('BLOCK (by height):', block)
        }

        /* Validate block. */
        if (!block) {
            return []
        }

        /* Return block details. */
        return [{
            hash: block.hash,
            confirmations: block.confirmations,
            height: block.height,
            size: block.size,
            txcount: block.txcount,
            feePoolAmt: block.feePoolAmt,
            merkleroot: block.merkleroot,
            time: block.time,
            mediantime: block.mediantime,
            nonce: block.nonce,
            bits: block.bits,
            difficulty: block.difficulty,
            chainwork: block.chainwork,
            utxoCommitment: block.utxoCommitment,
            minerData: block.minerData,
            status: block.status,
            onMainChain: block.onMainChain,
            ancestorhash: block.ancestorhash,
            nextblockhash: block.nextblockhash,
            txid: block.txid,
            txidem: block.txidem,
        }]
    },
    description: `Request full __Block__ details by _hash_ or _height_.`,
}
