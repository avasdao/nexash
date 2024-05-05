/* Import modules. */
import moment from 'moment'
import PouchDB from 'pouchdb'

/* Initialize databases. */
// const groupDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/transactions_group`) // LEGACY -- REMOVE
const groupTxsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/group_txs`)
// const transactionsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/transactions`)

export default async (_transaction) => {
    /* Initialize locals. */
    let existingTx
    let group
    let newUpdatedTx
    let output
    let outputs
    let result
    let scriptPubKey
    let txidem

    /* Set transaction IDEM .*/
    txidem = _transaction.txidem

    /* Set outputs. */
    outputs = _transaction.vout

    /* Handle outputs. */
    for (let i = 0; i < outputs.length; i++) {
        /* Set output. */
        output = outputs[i]

        /* Set script public key. */
        scriptPubKey = output?.scriptPubKey

        /* Set group. */
        group = scriptPubKey?.group
        // console.log('HANDLING GROUP', typeof group, group)

        if (typeof group === 'undefined') {
            continue
        }
        // console.log('SCRIPT PUB KEY', scriptPubKey)

        // NOTE: Attepmt to (1st) retrieve "existing" transaction data.
        existingTx = await groupTxsDb
            .get(txidem)
            .catch(err => console.error(err))

        /* Validate transaction. */
        if (existingTx) {
            /* Update existingTx entry. */
            newUpdatedTx = {
                _id: existingTx._id,
                _rev: existingTx._rev,
                ..._transaction,
                updatedAt: moment().unix(),
            }
        } else {
            /* Create NEW entry. */
            newUpdatedTx = {
                _id: _transaction.txidem,
                ..._transaction,
                createdAt: moment().unix(),
            }
        }

        result = await groupTxsDb
            .put(newUpdatedTx)
            .catch(err => {
                console.error(err)
            })

// FIXME: THIS IS LEGACY -- REMOVE
        // result = await groupDb
        //     .put(newUpdatedTx)
        //     .catch(err => {
        //         console.error(err)
        //     })
    }

    /* Return result. */
    return result
}
