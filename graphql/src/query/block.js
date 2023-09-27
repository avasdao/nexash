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
        console.log('BLOCKS (by hashes):', hashes)

        if (typeof _args?.height === 'number') {
            heights = [_args.height.toString()]
        } else if (Array.isArray(_args?.height)) {
            heights = _args.height.map(_height => {
                return _height.toString()
            })
        }
        console.log('BLOCKS (by heights):', heights)

        /* Validate block hash. */
        if (!blocks && hashes) {
            blocks = await blocksDb
                .query('api/byHash', {
                    keys: hashes,
                })
                .catch(err => console.error(err))
        }

        /* Validate block height. */
        if (!blocks && heights) {
            // NOTE: We MUST convert height (Int) to a (String).
            blocks = await blocksDb
                .allDocs({
                    keys: heights,
                    include_docs: true,
                })
                .catch(err => console.error(err))
            // console.log('BLOCK (by height):', block)
        }
        console.log('BLOCKS', blocks)

        /* Validate blocks. */
        if (!blocks) {
            return []
        }

        /* Map block details. */
        blocks = blocks.rows.map(_row => {
            const block = _row.value
            console.log('BLOCK', block)

            return {
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
            }
        })

        /* Return block details. */
        return blocks
    },
    description: `Request full __Block__ details by _hash_ or _height_.`,
}
