/* Import modules. */
import moment from 'moment'
import PouchDB from 'pouchdb'

/* Initialize databases. */
const outputsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/outputs`)

export default async (_transaction) => {
    /* Initialize locals. */
    let existingOutput
    let group
    let newUpdatedOutput
    let inputs
    let outpoint
    let output
    let outputs
    let result
    // let scriptPubKey
    let txidem

    /* Set transaction IDEM .*/
    txidem = _transaction.txidem

    /* Set inputs. */
    inputs = _transaction.vin

    /* Set outputs. */
    outputs = _transaction.vout

    /* Handle outputs. */
    for (let i = 0; i < outputs.length; i++) {
        /* Set output. */
        output = outputs[i]

        /* Add spent flag. */
        output.isSpent = false

        /* Set outpoint. */
        outpoint = output?.outpoint
        // console.log('OUTPOINT', outpoint)

        // NOTE: Attepmt to (1st) retrieve "existing" transaction data.
        existingOutput = await outputsDb
            .get(txidem)
            .catch(err => console.error(err))

        /* Validate transaction. */
        if (existingOutput) {
            /* Update existingOutput entry. */
            newUpdatedOutput = {
                _id: existingOutput._id,
                _rev: existingOutput._rev,
                ...output,
                updatedAt: moment().unix(),
            }
        } else {
            /* Create NEW entry. */
            newUpdatedOutput = {
                _id: outpoint,
                ...output,
                createdAt: moment().unix(),
            }
        }

        result = await outputsDb
            .put(newUpdatedOutput)
            .catch(err => {
                console.error(err)
            })
    }

    /* Handle inputs. */
    for (let i = 0; i < inputs.length; i++) {
        /* Set input. */
        input = inputs[i]

        /* Set outpoint. */
        outpoint = input?.outpoint
        // console.log('OUTPOINT', outpoint)

        // NOTE: Attepmt to (1st) retrieve "existing" transaction data.
        existingOutput = await outputsDb
            .get(outpoint)
            .catch(err => console.error(err))

        /* Validate transaction. */
        if (existingOutput) {
            /* Set spent flag. */
            existingOutput.isSpent = true

            /* Update existingOutput entry. */
            newUpdatedOutput = {
                _id: existingOutput._id,
                _rev: existingOutput._rev,
                ...existingOutput,
                updatedAt: moment().unix(),
            }

            /* Update entry, with new flag set. */
            result = await outputsDb
                .put(newUpdatedOutput)
                .catch(err => {
                    console.error(err)
                })
        }
    }

    /* Return result. */
    return result
}
