/* Import modules. */
import { encodeAddress } from '@nexajs/address'
import { GraphQLObjectType } from 'graphql'
import { hexToBin } from '@bitauth/libauth'
import { PubSub } from 'graphql-subscriptions'
import PouchDB from 'pouchdb'

/* Initialize databases. */
const blocksDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/blocks`)
const logsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/logs`)
const transactionsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/transactions`)


/* Import subscriptions. */
import address from './subscriptions/address.js'
import block from './subscriptions/block.js'
import id from './subscriptions/id.js'
import transaction from './subscriptions/transaction.js'

/* Initialize PubSub. */
const pubsub = new PubSub()

/* Set name. */
const name = 'Subscription'

/* Set (Mutation) fields. */
const fields = {
    address: address(pubsub),
    block: block(pubsub),
    id: id(pubsub),
    transaction: transaction(pubsub),
}

/* Set (Mutation) description. */
const description = `
Subscribe to a feed of authenticated data directly from the [__Nexa__](https://nexa.org) blockchain.
\nPlease visit the [__NexaShell Docs__](https://docs.nexa.exchange) for more information.
\n__NOTE:__ Data is streamed from its _Source_ as "single" Objects and NOT as an _Array_ (such as with Query).
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

// TODO We MUST periodically check the database connections
//      and re-connect if/when necessary.

/* Subscribe to Block changes. */
blocksDb.changes({
    since: 'now',
    live: true,
    include_docs: true
}).on('change', function (change) {
    // console.log('CHANGES (blocksDb):', change)

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
    // console.log('CHANGES (transactionsDb):', change)

    /* Set transaction (doc) data. */
    const transaction = change?.doc

    /* Publish new transaction. */
    pubsub.publish('NEW_TRANSACTION', { transaction })

    /* Set outputs. */
    const outputs = transaction.vout

    outputs.forEach(_output => {
        /* Set script public key. */
        const scriptPubKey = _output.scriptPubKey.hex.slice(6)
        const pkhScript = hexToBin('17005114' + scriptPubKey)

        const prefix = 'nexa'

        const type = 'TEMPLATE'

        const base58 = encodeAddress(prefix, type, pkhScript)
        // console.info('Nexa address (base58):', base58)

        const address = {
            prefix,
            type,
            hash: scriptPubKey,
            base58,
            txidem: transaction.txidem,
            hex: transaction.hex,
        }
        // console.log('ADDRESS', address)

        /* Publish address update. */
        pubsub.publish('ADDRESS_UPDATE', { address })
    })
}).on('complete', function (info) {
    // console.log('CHANGES (complete):', change)
}).on('error', function (err) {
    console.log(err)
})
