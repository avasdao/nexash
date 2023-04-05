export default defineEventHandler(async (event) => {
    /* Set block id. */
    // NOTE: Either txid or txidem.
    const transactionid = event.context.params.id

    /* Set Nexa GraphQL endpoint. */
    const ENDPOINT = 'https://nexa.sh/graphql'

    const query = `
    {
        transaction(txidem: "${transactionid}", txid: "${transactionid}") {
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

    let transaction

    /* Make query request. */
    const result = await $fetch(ENDPOINT,
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
