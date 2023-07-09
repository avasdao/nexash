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
    console.log('ID', id)

    response = await getTransaction(id)
        .catch(err => console.error(err))
    console.log('RESPONSE', response)

    return response

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

    if (result?.data?.transaction) {
        transaction = result.data.transaction[0]
    } else {
        transaction = {}
    }

    /* Return transaction. */
    return transaction
})
