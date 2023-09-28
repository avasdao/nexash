/* Import modules. */
import PouchDB from 'pouchdb'

/* Initialize databases. */
const scriptTxsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/script_txs`)

export default async (_transaction) => {
    /* Initialize locals. */
    let output
    let outputs
    let result
    let scriptHash
    let scriptPubKey
    let scriptType

    outputs = _transaction.vout

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
