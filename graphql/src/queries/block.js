/* Import modules. */
import PouchDB from 'pouchdb'

/* Initialize databases. */
const blocksDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/blocks`)
const logsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/logs`)

/* Import types. */
import BlockType from '../types/Block.js'

import {
    GraphQLInt,
    GraphQLString,
} from 'graphql'

export default {
    type: BlockType,
    args: {
        hash: {
            type: GraphQLString,
            description: `Provide a __Block__ hash.`,
        },
        height: {
            type: GraphQLInt,
            description: `Provide a __Block__ height.`,
        },
    },
    resolve: async (parent, args, params) => {
        console.log('Block (args):', args)

        /* Initialize block. */
        let block = null

        /* Validate block hash. */
        if (!block && args?.hash) {
            block = await blocksDb
                .query('api/byHash', {
                    key: args.hash,
                })
                .catch(err => console.error(err))
            console.log('BLOCK (by hash):', block)
        }

        /* Validate block height. */
        if (!block && args?.height >= 0) {
            // NOTE: We MUST convert height (Int) to a (String).
            block = await blocksDb.get(args.height.toString())
                .catch(err => console.error(err))
            console.log('BLOCK (by height):', block)
        }

        /* Validate block. */
        if (!block) {
            return {}
        }

        /* Return block details. */
        return {
            hash: block.hash,
            confirmations: block.confirmations,
            height: block.height,
            size: block.size,
            txcount: block.txcount,
        }
    },
    description: `Request full __Block__ details by _hash_ or _height_.`,
}
