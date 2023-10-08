/* Import modules. */
import moment from 'moment'
import PouchDB from 'pouchdb'

/* Initialize databases. */
const transactionsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/transactions`)

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
    resolve: async (_root, _args, _ctx) => {
        // console.log('Transaction (args):', _args)

        /* Initialize transaction. */
        let transactions
        let txidems
        let txids

        if (typeof _args?.txidem === 'string') {
            txidems = [_args.txidem]
        } else if (Array.isArray(_args?.txidem)) {
            txidems = _args.txidem
        }
        // console.log('TRANSACTIONS (by txidem):', txidems)

        if (typeof _args?.txid === 'string') {
            txids = [_args.txid]
        } else if (Array.isArray(_args?.txid)) {
            txids = _args.txid
        }
        // console.log('TRANSACTIONS (by txid):', txids)

        /* Validate transaction height. */
        if (!transactions && txidems) {
            // NOTE: We MUST convert height (Int) to a (String).
            transactions = await transactionsDb
                .allDocs({
                    keys: txidems,
                    include_docs: true,
                })
                .catch(err => console.error(err))
            // console.log('TRANSACTION (by idem):', transactions)
        }

        if (!transactions && _args?.txid) {
            // NOTE: We MUST convert height (Int) to a (String).
            transactions = await transactionsDb
                .query('api/byTxid', {
                    keys: txids,
                    include_docs: true,
                })
                .catch(err => console.error(err))
            // console.log('TRANSACTION (by id):', transactions)
        }

        /* Validate transaction. */
        if (!transactions) {
            return []
        }

        /* Map block details. */
        transactions = transactions.rows.map(_row => {
            const transaction = _row.doc
            console.log('TRANSACTION', transaction)

            /* Validate `time` for "unconfirmed" transactions. */
            if (transaction.time === null) {
                /* Add `time` for "unconfirmed" transactions. */
                transaction.time = moment().unix()
            }

            return transaction
        })

        /* Return transaction details. */
        return transactions
    },
    description: `Request full __Transaction__ details by _hash_ or _height_.`,
}
