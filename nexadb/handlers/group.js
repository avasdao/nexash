/* Import modules. */
import PouchDB from 'pouchdb'

/* Initialize databases. */
const groupDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/transactions_group`)

export default async (_transaction) => {
    /* Initialize locals. */
    let group
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
        scriptPubKey = output.scriptPubKey
        console.log('SCRIPT PUB KEY', scriptPubKey)

        /* Set group. */
        group = scriptPubKey.group
        console.log('HANDLING GROUP', typeof group, group)

        /* Validate group. */
        if (typeof group !== 'undefined') {
            result = await transactionsDb
                .put({
                    _id: _transaction.txidem,
                    ..._transaction
                })
                .catch(err => {
                    console.error(err)
                })
        }
    }

    return result
}
