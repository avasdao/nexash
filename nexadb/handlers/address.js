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
        scriptPubKey = output.scriptPubKey.hex.slice(6)

        /* Request saved (in database) data. */
        saved = await addressesDb
            .get(scriptPubKey)
            .catch(err => console.error(err))
        // console.log('SAVED (outputs):', saved)

        /* Validate saved address. */
        if (saved) {
            /* Load transactions. */
            txs = saved.txs
        } else {
            /* Initialize transactions. */
            txs = []
        }

        /* Add transaction. */
        txs.push(_transaction.txidem)

        newAddress = {
            ...saved,
            txcount: txs.length,
            txs,
        }

        result = await addressesDb
            .put(newAddress)
            .catch(err => console.error(err))
        console.log('OUTPOINT (result):', result)
    }

    return result
}
