/* Import modules. */
import moment from 'moment'
import PouchDB from 'pouchdb'

/* Initialize databases. */
const systemDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/system`)

/* Import handlers. */
import handleGroup from '../handlers/group.js'

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
    console.info('\n  Checking BLOCKS database sync...\n')

    let block
    let systemIdx
    let tx
    let txidem
    let updatedSystem

    systemIdx = await systemDb
        .get('idxGroupTxs')
        .catch(err => console.error(err))
    // console.log('SYSTEM', systemIdx)

    if (_curHeight > systemIdx?.last) {
        console.info('\n  Starting GROUP database sycn...\n')

        /* Handle new blocks. */
        for (let i = systemIdx.last + 1; i <= blockchainInfo.blocks; i++) {
            /* Request block at height. */
            block = await getBlock(i)
                .catch(err => {
                    console.error(err)
                })

            // NOTE: Block MUST contain at least the Coinbase transaction.
            if (block?.txidem) {
                for (let j = 0; j < block.txidem.length; j++) {
                    /* Set transaction idem. */
                    txidem = block.txidem[j]

                    /* Request transaction details. */
                    tx = await getTransaction(txidem)
                        .catch(err => {
                            console.error(err)
                        })
                    // console.log(`TRANSACTION [${txidem}]`, tx)

                    /* Handle Group (Tokens). */
                    await handleGroup(tx)
                }
            }

            /* Retrieve (latest) System status. */
            updatedSystem = await systemDb
                .get('idxGroupTxs')
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
