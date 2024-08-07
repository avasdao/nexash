/* Import modules. */
import moment from 'moment'
import PouchDB from 'pouchdb'

/* Initialize databases. */
const scriptTxsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/script_txs`)

export default async (_transaction) => {
    /* Initialize locals. */
    let existingTx
    let newUpdatedTx
    let output
    let outputs
    let result
    let scriptHash
    let scriptPubKey
    let scriptType
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

        /* Set script type. */
        scriptType = scriptPubKey?.type || null
        // console.log('SCRIPT TYPE', typeof scriptType, scriptType)

        /* Set script hash. */
        scriptHash = scriptPubKey?.scriptHash || null
        // console.log('SCRIPT HASH', typeof scriptHash, scriptHash)

        if (scriptType === 'pubkeyhash' || scriptType === 'nulldata' || scriptType === 'publiclabel' || scriptHash === 'pay2pubkeytemplate') {
            continue
        }
        // console.log('SCRIPT HASH', scriptHash)

        // NOTE: Attepmt to (1st) retrieve "existing" transaction data.
        existingTx = await scriptTxsDb
            .get(txidem)
            .catch(err => console.error(err))
        // console.log('EXISTING TX', existingTx)

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
        // console.log('NEW UPDATED', newUpdatedTx)

        /* Add transaction to database. */
        result = await scriptTxsDb
            .put(newUpdatedTx)
            .catch(err => {
                console.error(err)
            })
    }

    /* Return result. */
    return result
}
