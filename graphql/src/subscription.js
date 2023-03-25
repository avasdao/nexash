/* Import modules. */
import { GraphQLObjectType } from 'graphql'
import { PubSub } from 'graphql-subscriptions'
import PouchDB from 'pouchdb'

/* Initialize databases. */
const blocksDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/blocks`)
const logsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/logs`)
const transactionsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/transactions`)


/* Import subscriptions. */
import block from './subscriptions/block.js'
import transaction from './subscriptions/transaction.js'

/* Initialize PubSub. */
const pubsub = new PubSub()

/* Set name. */
const name = 'Subscription'

/* Set (Mutation) fields. */
const fields = {
    block: block(pubsub),
    transaction: transaction(pubsub),
}

/* Set (Mutation) description. */
const description = `
Subscribe to a feed of authenticated data directly from the Nexa blockchain.
\nSee the [Docs](https://docs.nexa.exchange) for more info.
`.trim()

/**
 * Subscription
 *
 * Allows for long-lived subscriptios to Exchange data.
 */
export default new GraphQLObjectType({
    name,
    fields,
    description,
})

/* Subscribe to Block changes. */
blocksDb.changes({
    since: 'now',
    live: true,
    include_docs: true
}).on('change', function (change) {
    console.log('CHANGES (blocksDb):', change)

    /* Set block (doc) data. */
    const block = change?.doc

    /* Publish new block. */
    pubsub.publish('NEW_BLOCK', { block })
}).on('complete', function (info) {
    // console.log('CHANGES (complete):', change)
}).on('error', function (err) {
    console.log(err)
})

/* Subscribe to Transaction changes. */
transactionsDb.changes({
    since: 'now',
    live: true,
    include_docs: true
}).on('change', function (change) {
    console.log('CHANGES (transactionsDb):', change)

    /* Set transaction (doc) data. */
    const transaction = change?.doc

    /* Publish new transaction. */
    pubsub.publish('NEW_TRANSACTION', { transaction })
}).on('complete', function (info) {
    // console.log('CHANGES (complete):', change)
}).on('error', function (err) {
    console.log(err)
})
