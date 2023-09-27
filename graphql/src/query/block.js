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

        /* Initialize local. */
        let blocks
        let hashes
        let heights

        if (typeof _args?.hash === 'string') {
            hashes = [_args.hash.toString()]
        } else if (Array.isArray(_args?.hash)) {
            hashes = _args.hash
        }

        if (typeof _args?.height === 'number') {
            heights = [_args.height.toString()]
        } else if (Array.isArray(_args?.height)) {
            heights = _args.height.map(_height => {
                return _height.toString()
            })
        }

        /* Validate block hash. */
        if (!blocks && hashes) {
            blocks = await blocksDb
                .query('api/byHash', {
                    keys: hashes,
                })
                .catch(err => console.error(err))
            // console.log('BLOCK (by hash):', block)
        }

        /* Validate block height. */
        if (!blocks && heights) {
            // NOTE: We MUST convert height (Int) to a (String).
            blocks = await blocksDb
                .allDocs({
                    keys: heights,
                })
                .catch(err => console.error(err))
            // console.log('BLOCK (by height):', block)
        }

        /* Validate blocks. */
        if (!blocks) {
            return []
        }

        /* Return block details. */
        return blocks.map(_block => {
            hash: _block.hash,
            confirmations: _block.confirmations,
            height: _block.height,
            size: _block.size,
            txcount: _block.txcount,
            feePoolAmt: _block.feePoolAmt,
            merkleroot: _block.merkleroot,
            time: _block.time,
            mediantime: _block.mediantime,
            nonce: _block.nonce,
            bits: _block.bits,
            difficulty: _block.difficulty,
            chainwork: _block.chainwork,
            utxoCommitment: _block.utxoCommitment,
            minerData: _block.minerData,
            status: _block.status,
            onMainChain: _block.onMainChain,
            ancestorhash: _block.ancestorhash,
            nextblockhash: _block.nextblockhash,
            txid: _block.txid,
            txidem: _block.txidem,
        })
    },
    description: `Request full __Block__ details by _hash_ or _height_.`,
}
