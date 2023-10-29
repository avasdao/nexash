/* Import modules. */
import { getTransaction } from '@nexajs/rostrum'

export default defineEventHandler(async (event) => {
    let id
    let response
    let result
    let transaction

    /* Set block id. */
    // NOTE: Either txid or txidem.
    id = event.context.params.id

    /* Set Nexa GraphQL endpoint. */
    const ENDPOINT = 'https://nexa.sh/graphql'

    const query = `
    {
        transaction(txidem: "${id}", txid: "${id}") {
          txidem
          txid
          confirmations
          size
          version
          locktime
          spends
          sends
          fee
          vin {
            outpoint
            amount
            scriptSig {
              asm
              hex
            }
            sequence
          }
          vout {
            value
            type
            n
            scriptPubKey {
              asm
              hex
              type
              scriptHash
              argsHash
              addresses
            }
            outpoint
          }
          blockhash
          time
          blocktime
          hex
        }
      }
    `

    /* Make query request. */
    result = await $fetch(ENDPOINT,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ query }),
        })
        .catch(err => console.error(err))
    // console.log('RESULT', result)

    if (result?.data?.transaction) {
        transaction = result.data.transaction[0]
    } else {
        transaction = {}
    }
    // console.log('TRANSACTION', transaction)

    /* Validate confrimations. */
    if (transaction?.confirmations === 0) {
        response = await getTransaction(transaction.txid)
            .catch(err => console.error(err))
        // console.log('RESPONSE', response)

        // transaction.extra = response
        transaction.height = response.height
        transaction.blockhash = response.blockhash
        transaction.blocktime = response.blocktime
        transaction.confirmations = response.confirmations
        transaction.version = response.version
        transaction.time = response.time
        transaction.locktime = response.locktime
    }

    /* Return transaction. */
    return transaction
})
