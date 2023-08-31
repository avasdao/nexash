/* Import modules. */
import PouchDB from 'pouchdb'

/* Initialize databases. */
const addressesDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/addresses`)

export default async (_transaction) => {
    /* Initialize locals. */
    let newAddress
    let output
    let outputs
    let result
    let saved
    let scriptPubKey
    let txs

    outputs = _transaction.vout

    for (let i = 0; i < outputs.length; i++) {
        /* Set output. */
        output = outputs[i]

        /* Set script public key. */
        // NOTE: This is the constraint.
        // scriptPubKey = output.scriptPubKey.hex.slice(6)
        scriptPubKey = output.scriptPubKey.argsHash?.toLowerCase()
        // console.log('SCRIPT PUB KEY', scriptPubKey)

        /* Request saved (in database) data. */
        saved = await addressesDb
            .get(scriptPubKey)
            .catch(err => console.error(err))
        // console.log('SAVED (outputs):', saved)

        /* Validate saved address. */
        if (saved) {
            /* Load transactions. */
            txs = saved.txs

            /* Validate saved transactions. */
            // NOTE: Required during re-syncing to prevent duplicates.
            if (!txs.includes(_transaction.txidem)) {
                /* Add transaction. */
                // TODO What is the (MAX) number of entries we can add here??
                txs.push(_transaction.txidem)
            }

            newAddress = {
                ...saved,
                txcount: txs.length,
                txs,
            }
        } else {
            /* Initialize transactions. */
            txs = []

            /* Add transaction. */
            txs.push(_transaction.txidem)

            newAddress = {
                _id: scriptPubKey,
                txcount: txs.length,
                txs,
            }
        }

        result = await addressesDb
            .put(newAddress)
            .catch(err => console.error(err))
        // console.log('OUTPOINT (result):', result)
    }

    return result
}
