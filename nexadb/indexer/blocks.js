/* Import modules. */
import moment from 'moment'
import PouchDB from 'pouchdb'

/* Initialize databases. */
const blocksDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/blocks`)
const systemDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/system`)

/* Import helpers. */
import getBlock from '../utils/getBlock.js'

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
        .get('idxBlocks')
        .catch(err => console.error(err))
    // console.log('SYSTEM', systemIdx)

    if (_curHeight > systemIdx?.last) {
        console.info('\n  Starting database sycn...\n')

        /* Handle new blocks. */
        for (let i = systemIdx.last + 1; i <= _curHeight; i++) {
            /* Request block at height. */
            block = await getBlock(i)
                .catch(err => {
                    console.error(err)
                })
            // console.log(`BLOCK #${i}`, block)

            /* Save block to storage. */
            await blocksDb
                .put({
                    _id: block.height.toString(),
                    ...block,
                })
                .catch(err => {
                    console.error(err)
                })

            /* Retrieve (latest) System status. */
            updatedSystem = await systemDb
                .get('idxBlocks')
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
