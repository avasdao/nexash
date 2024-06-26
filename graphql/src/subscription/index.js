/* Import modules. */
import { encodeAddress } from '@nexajs/address'
import { OP } from '@nexajs/script'
import { hexToBin } from '@nexajs/utils'
import { GraphQLObjectType } from 'graphql'
import { PubSub } from 'graphql-subscriptions'
import PouchDB from 'pouchdb'

/* Initialize databases. */
const blocksDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/blocks`)
const logsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/logs`)
const transactionsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/transactions`)


/* Import subscriptions. */
import address from './address.js'
import block from './block.js'
import persona from './persona.js'
import transaction from './transaction.js'

/* Initialize PubSub. */
const pubsub = new PubSub()

/* Set name. */
const name = 'Subscription'

/* Set (Mutation) fields. */
const fields = {
    address: address(pubsub),
    block: block(pubsub),
    persona: persona(pubsub),
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
        /* Set public key hash. */
        const pubKeyHash = hexToBin(_output.scriptPubKey.hex)

        const prefix = 'nexa'

        const type = 'TEMPLATE'

        const base58 = encodeAddress(prefix, type, pubKeyHash)
        // console.info('Nexa address (base58):', base58)

        const address = {
            prefix,
            type,
            hash: pubKeyHash,
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
