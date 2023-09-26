/**
 * Check Database Syncronization
 *
 * Performs a check to make sure we have indexed up to the
 * latest block height.
 */
export default async () => {
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

    if (blockchainInfo?.blocks > systemIdx?.last) {
        console.info('\n  Starting database sycn...\n')

        /* Handle new blocks. */
        for (let i = systemIdx.last + 1; i <= blockchainInfo.blocks; i++) {
            /* Request block at height. */
            block = await getBlock(i)
                .catch(err => {
                    console.error(err)
                })
            // console.log(`BLOCK #${i}`, block)

            /* Save block to storage. */
            // await blocksDb
            //     .put({
            //         _id: block.height.toString(),
            //         ...block,
            //     })
            //     .catch(err => {
            //         console.error(err)
            //     })

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

                    /* Save transaction to storage. */
                    // await transactionsDb
                    //     .put({
                    //         _id: tx.txidem,
                    //         ...tx
                    //     })
                    //     .catch(err => {
                    //         console.error(err)
                    //     })

                    /* Handle Address. */
                    // await handleAddress(tx)

                    /* Handle Group (Tokens). */
                    await handleGroup(tx)
                }
            }

            /* Retrieve (latest) System status. */
            updatedSystem = await systemDb
                .get('0')
                .catch(err => console.error(err))
            // console.log('UPDATED SYSTEM', updatedSystem)

            /* Set new indexed height. */
            updatedSystem.idxHeight = i
            updatedSystem.updatedAt = moment().unix()

            /* Save (updated) System status to storage. */
            await systemDb
                .put(updatedSystem)
                .catch(err => console.error(err))
        }
    }
}
