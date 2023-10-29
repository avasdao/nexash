/* Import modules. */
import moment from 'moment'
import PouchDB from 'pouchdb'

/* Initialize databases. */
const scriptTemplates = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/script_templates`)
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
            // type: new GraphQLList(ScriptType),
            type: new GraphQLList(GraphQLString),
            description: `Enter the __ScripHash__ for an on-chain Transaction.`,
        },
        nulldata: {
            // type: new GraphQLList(ScriptType),
            type: new GraphQLList(GraphQLString),
            description: `Enter the __Nulldata (OP_DATA) Prefix__ for an on-chain Transaction.`,
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
        let hash
        let nulldata
        let metadata

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
        // console.log('BEFORE', before)

        if (typeof _args?.after === 'boolean') {
            after = _args.after
        } else {
            after = null
        }
        // console.log('AFTER', after)

        if (typeof _args?.hash === 'object') {
            hash = _args.hash

            if (hash) {
                hash = hash[0] // FIXME Allow array of hashes.
            }
        } else {
            hash = null
        }
        console.log('(SCRIPT) HASH)', hash)

        if (typeof _args?.nulldata === 'string') {
            nulldata = _args.nulldata

            if (nulldata) {
                nulldata = nulldata[0] // FIXME Allow array of (null) data.
            }
        } else {
            nulldata = null
        }
        // console.log('NULL DATA (ie. OP_RETURN)', nulldata)

        // TODO Add validation for ALL arguments

        /* Validate first (limit). */
        if (first > 10000) {
            first = 10000 // TODO Limit to PRO subscribers ONLY.
        }

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

        if (hash) {
            // NOTE: We MUST convert height (Int) to a (String).
            metadata = await scriptTemplates
                .get(hash)
                .catch(err => console.error(err))
            console.log('METADATA', hash, metadata)

            if (metadata) {
                metadata = {
                    id: metadata._id,
                    ...metadata,
                }

                delete metadata._id
                delete metadata._rev

                metadata = JSON.stringify(metadata)
            }
        }

        /* Set connection info. */
        const connInfo = {
            profiles: [],
            updatedAt: moment().valueOf(),
        }

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
            metadata,
        }

        /* Build connection. */
        const connection = {
            connInfo,
            totalCount,
            edges,
            pageInfo,
        }

        /* Return transaction details. */
        return connection
    },
    description: `Request information about on-chain __Script__ transactions, eg. _OP_RETURN_ and _CashFusion._`,
}
