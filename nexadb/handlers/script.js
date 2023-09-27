/* Import modules. */
import PouchDB from 'pouchdb'

/* Initialize databases. */
const scriptTxsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/script_txs`)

export default async (_transaction) => {
    /* Initialize locals. */
    let scriptHash
    let output
    let outputs
    let result
    let scriptPubKey

    outputs = _transaction.vout

    for (let i = 0; i < outputs.length; i++) {
        /* Set output. */
        output = outputs[i]

        /* Set script public key. */
        scriptPubKey = output?.scriptPubKey

        /* Set script hash. */
        scriptHash = scriptPubKey?.scriptHash
        // console.log('HANDLING GROUP', typeof scriptHash, scriptHash)

        if (scriptHash === 'pay2pubkeytemplate') {
            continue
        }
        // console.log('SCRIPT HASH', scriptHash)

        result = await scriptTxsDb
            .put({
                _id: _transaction.txidem,
                ..._transaction
            })
            .catch(err => {
                console.error(err)
            })
    }

    /* Return result. */
    return result
}
