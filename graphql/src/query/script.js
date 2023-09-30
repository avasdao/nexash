/* Import modules. */
import PouchDB from 'pouchdb'

/* Initialize databases. */
const scriptTxsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/script_txs`)

/* Import types. */
import TransactionConnectionType from '../types/TransactionConnection.js'
import ScriptType from '../types/Script.js'

import {
    // GraphQLBoolean,
    // GraphQLFloat,
    GraphQLList,
    // GraphQLNonNull,
    // GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
} from 'graphql'

const DEFAULT_MAXIMUM_RESULTS = 100

export default {
    type: TransactionConnectionType,
    args: {
        first: {
            type: GraphQLInt,
            description: `Enter the number of records to return for the __First Slice__ of data.`,
        },
        last: {
            type: GraphQLInt,
            description: `Enter the number of records to return for the __Last Slice__ of data.`,
        },
        before: {
            type: GraphQLString,
            description: `Enter the cursor to proceed.`,
        },
        after: {
            type: GraphQLString,
            description: `Enter the cursor to proceed.`,
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
        console.log('Script (args):', _args)

        /* Initialize locals. */
        let after
        let before
        let first
        let last
        let hashes
        let transactions

        // if (typeof _args?.txidem === 'string') {
        //     txidems = [_args.txidem]
        // } else if (Array.isArray(_args?.txidem)) {
        //     txidems = _args.txidem
        // }
        // console.log('TRANSACTIONS (by txidem):', txidems)

        if (typeof _args?.first === 'number') {
            first = _args.first
        } else {
            first = DEFAULT_MAXIMUM_RESULTS
        }
        // console.log('FIRST', first)

        if (typeof _args?.last === 'number') {
            last = _args.last
        } else {
            last = DEFAULT_MAXIMUM_RESULTS
        }
        // console.log('LAST', last)

        if (typeof _args?.before === 'boolean') {
            before = _args.before
        } else {
            before = null
        }
        console.log('BEFORE', before)

        if (typeof _args?.after === 'boolean') {
            after = _args.after
        } else {
            after = null
        }
        console.log('AFTER', after)

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

        /* Set total count. */
        const totalCount = transactions.length

        /* Build edges. */
        const edges = transactions.map(_transaction => {
            return {
                node: _transaction,
                cursor: null,
            }
        })
        // console.log('EDGES', edges);

        /* Build page info. */
        const pageInfo = {
            startCursor: null,
            endCursor: null,
            hasNextPage: false,
            hasPreviousPage: false,
        }

        /* Build connection. */
        const connection = {
            totalCount,
            edges,
            pageInfo,
        }

        /* Return transaction details. */
        return connection
    },
    description: `Request information about on-chain __Script__ transactions, eg. _OP_RETURN_ and _CashFusion._`,
}
