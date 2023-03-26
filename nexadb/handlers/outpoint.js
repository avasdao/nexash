/* Import modules. */
import PouchDB from 'pouchdb'

/* Initialize databases. */
const outpointsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/outpoints`)

export default async (_transaction) => {
    let newOutpoint
    let result

    const inputs = _transaction.vin
    const outputs = _transaction.vout

    for (let i = 0; i < inputs.length; i++) {
        /* Set output. */
        const input = inputs[i]

        /* Set outpoint. */
        const outpoint = input.outpoint

        /* Saved (in database) value. */
        const saved = outpointsDb
            .get(outpoint)
            .catch(err => console.error(err))
        console.log('SAVED', saved)

        if (saved) {
            const txs = saved.txs
            txs[_transaction.txidem] = _transaction

            newOutpoint = {
                ...saved,
                txs,
            }
        } else {
            const txs = {}
            txs[_transaction.txidem] = _transaction

            newOutpoint = {
                _id: outpoint,
                txs,
            }
        }

        result = outpointsDb
            .put(newOutpoint)
            .catch(err => console.error(err))
        console.log('OUTPOINT (result):', result)
    }

    for (let i = 0; i < outputs.length; i++) {
        /* Set output. */
        const output = outputs[i]

        /* Set outpoint. */
        const outpoint = output.outpoint

        /* Saved (in database) value. */
        const saved = outpointsDb
            .get(outpoint)
            .catch(err => console.error(err))
        console.log('SAVED', saved)

        if (saved) {
            const txs = saved.txs
            saved.txs[_transaction.txidem] = _transaction

            newOutpoint = {
                ...saved,
                txs,
            }
        } else {
            const txs = {}
            saved.txs[_transaction.txidem] = _transaction

            newOutpoint = {
                _id: outpoint,
                txs,
            }
        }

        result = outpointsDb
            .put(newOutpoint)
            .catch(err => console.error(err))
        console.log('OUTPOINT (result):', result)
    }

    return result
}
