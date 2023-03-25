/* Import modules. */
import PouchDB from 'pouchdb'

/* Initialize databases. */
const logsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/logs`)
const txsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/txs`)

/* Import types. */
import TransactionType from '../types/Transaction.js'

import {
    GraphQLInt,
    GraphQLList,
    GraphQLString,
} from 'graphql'

export default {
    type: new GraphQLList(TransactionType),
    args: {
        txidem: {
            type: new GraphQLList(GraphQLString),
            description: `Provide a __Transaction__ idem.`,
        },
        txid: {
            type: new GraphQLList(GraphQLString),
            description: `Provide a __Transaction__ id.`,
        },
    },
    resolve: async (parent, args, params) => {
        console.log('Transaction (args):', args)

        /* Initialize transaction. */
        let transaction = null

        /* Validate transaction id. */
        // if (!transaction && args?.txid) {
        //     transaction = await txsDb
        //         .query('api/byHash', {
        //             key: args.txidem[0],
        //         })
        //         .catch(err => console.error(err))
        //     console.log('TRANSACTION (by id):', transaction)
        // }

        /* Validate transaction height. */
        if (!transaction && args?.txidem) {
            // NOTE: We MUST convert height (Int) to a (String).
            transaction = await txsDb.get(args.txidem[0])
                .catch(err => console.error(err))
            console.log('TRANSACTION (by idem):', transaction)
        }

        /* Validate transaction. */
        if (!transaction) {
            return []
        }

        /* Return transaction details. */
        return [{
            txidem: transaction.txidem,
            txid: transaction.txid,
            confirmations: transaction.confirmations,
            size: transaction.size,
            version: transaction.version,
            locktime: transaction.locktime,
            blocktime: transaction.blocktime,
            hex: transaction.hex,
        }]
    },
    description: `Request full __Transaction__ details by _hash_ or _height_.`,
}
