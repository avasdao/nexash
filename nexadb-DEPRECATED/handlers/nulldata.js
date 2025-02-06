/* Import modules. */
import PouchDB from 'pouchdb'

/* Initialize databases. */
const nulldataTxsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/nulldata_txs`)

export default async (_transaction) => {
    /* Initialize locals. */
    let output
    let outputs
    let result
    let scriptPubKey
    let scriptType

    outputs = _transaction.vout

    for (let i = 0; i < outputs.length; i++) {
        /* Set output. */
        output = outputs[i]

        /* Set script public key. */
        scriptPubKey = output?.scriptPubKey

        /* Set script type. */
        scriptType = scriptPubKey?.type
        // console.log('SCRIPT TYPE', typeof scriptType, scriptType)

        if (scriptType === 'nulldata') {
            continue
        }
        // console.log('SCRIPT HASH', scriptHash)

        result = await nulldataTxsDb
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
