/* Import modules. */
import PouchDB from 'pouchdb'

/* Initialize databases. */
const scriptTxsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/script_txs`)

/* Import types. */
import ScriptType from '../types/Script.js'
import TransactionType from '../types/Transaction.js'

import {
    // GraphQLBoolean,
    // GraphQLFloat,
    GraphQLList,
    // GraphQLNonNull,
    // GraphQLObjectType,
    GraphQLInt,
    // GraphQLString,
} from 'graphql'

const DEFAULT_MAXIMUM_RESULTS = 100

export default {
    type: new GraphQLList(TransactionType),
    args: {
        first: {
            type: GraphQLInt,
            description: `Enter the number of records to return for the each __Slice__ of data.`,
        },
        hash: {
            type: new GraphQLList(ScriptType),
            description: `Enter the __ScripHash__ for an on-chain Transaction.`,
        },
        prefix: {
            type: new GraphQLList(ScriptType),
            description: `Enter the __Nulldata (OP_RETURN) Prefix__ for an on-chain Transaction.`,
        },
    },
    resolve: async (_root, _args, _ctx) => {
        console.log('Script (args):', _args, typeof _args?.first)

        /* Initialize transaction. */
        let first
        let hashes
        let transactions

        // if (typeof _args?.txidem === 'string') {
        //     txidems = [_args.txidem]
        // } else if (Array.isArray(_args?.txidem)) {
        //     txidems = _args.txidem
        // }
        // console.log('TRANSACTIONS (by txidem):', txidems)

        if (typeof _args?.first === 'int') {
            first = _args.first
        } else {
            first = DEFAULT_MAXIMUM_RESULTS
        }
        console.log('FIRST', first)

        // NOTE: We MUST convert height (Int) to a (String).
        transactions = await scriptTxsDb
            .query('api/byScriptHash', {
                limit: first,
                include_docs: true,
            })
            .catch(err => console.error(err))
        // console.log('TRANSACTION (by id):', transactions)

        /* Validate transaction. */
        if (!transactions) {
            return []
        }

        /* Map block details. */
        transactions = transactions.rows.map(_row => {
            const transaction = _row.doc
            // console.log('TRANSACTION', transaction)

            return transaction
        })

        /* Return transaction details. */
        return transactions
    },
    description: `Request information about on-chain __Script__ transactions, eg. _OP_RETURN_ and _CashFusion._`,
}
