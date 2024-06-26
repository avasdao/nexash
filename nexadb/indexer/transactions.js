/* Import modules. */
import moment from 'moment'
import PouchDB from 'pouchdb'

/* Initialize databases. */
const transactionsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/transactions`)
const systemDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/system`)

/* Import helpers. */
import getBlock from '../utils/getBlock.js'
import getTransaction from '../utils/getTransaction.js'

/**
 * Check Database Syncronization
 *
 * Performs a check to make sure we have indexed up to the
 * latest block height.
 */
export default async (_curHeight = 0) => {
    console.info('\n  Checking TRANSACTIONS database sync...\n')

    /* Initialize locals. */
    let block
    let existingTx
    let newUpdatedTx
    let realtimeTx
    let systemIdx
    let txidem
    let updatedSystem

    /* Request transactions index. */
    systemIdx = await systemDb
        .get('idxTransactions')
        .catch(err => console.error(err))
    // console.log('SYSTEM', systemIdx)

    /* Validate (last) block height. */
    if (_curHeight > systemIdx?.last) {
        console.info('\n  Starting TRANSACTIONS database sync...\n')

        /* Handle new blocks. */
        for (let i = systemIdx.last + 1; i <= _curHeight; i++) {
            /* Request block at height. */
            block = await getBlock(i)
                .catch(err => {
                    console.error(err)
                })
            // console.log(`BLOCK #${i}`, block)

            // NOTE: Block MUST contain at least the Coinbase transaction.
            if (block?.txidem) {
                for (let j = 0; j < block.txidem.length; j++) {
                    /* Set transaction idem. */
                    txidem = block.txidem[j]

                    /* Request transaction details. */
                    realtimeTx = await getTransaction(txidem)
                        .catch(err => {
                            console.error(err)
                        })
                    // console.log(`TRANSACTION [${txidem}]`, tx)

                    // NOTE: Attepmt to (1st) retrieve "existing" transaction data.
                    existingTx = await transactionsDb
                        .get(txidem)
                        .catch(err => console.error(err))

                    /* Validate transaction. */
                    if (existingTx) {
                        /* Update existingTx entry. */
                        newUpdatedTx = {
                            _id: existingTx._id,
                            _rev: existingTx._rev,
                            ...realtimeTx, // NOTE: Use "fresh" data from blockchain.
                            updatedAt: moment().unix(),
                        }
                    } else {
                        /* Create NEW entry. */
                        newUpdatedTx = {
                            _id: realtimeTx.txidem,
                            ...realtimeTx,
                            createdAt: moment().unix(),
                        }
                    }

                    /* Save transaction to storage. */
                    await transactionsDb
                        .put(newUpdatedTx)
                        .catch(err => {
                            console.error(err)
                        })
                }
            }

            /* Retrieve (latest) System status. */
            updatedSystem = await systemDb
                .get('idxTransactions')
                .catch(err => console.error(err))
            // console.log('UPDATED SYSTEM', updatedSystem)

            /* Set new indexed height. */
            updatedSystem.last = i
            updatedSystem.updatedAt = moment().unix()

            /* Save (updated) System status to storage. */
            await systemDb
                .put(updatedSystem)
                .catch(err => console.error(err))
        }
    }
}
