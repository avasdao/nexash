/* Import modules. */
import PouchDB from 'pouchdb'

/* Initialize databases. */
const scriptTxsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/script_txs`)

/* Import types. */
import Connection from '../types/Connection.js'
import ScriptType from '../types/Script.js'

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
    type: Connection,
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
        console.log('Script (args):', _args)

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

        if (typeof _args?.first === 'number') {
            first = _args.first
        } else {
            first = DEFAULT_MAXIMUM_RESULTS
        }
        // console.log('FIRST', first)

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
            delete _transaction._id
            delete _transaction._rev

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
