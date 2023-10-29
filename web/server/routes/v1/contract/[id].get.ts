/* Import modules. */
import { getTransaction } from '@nexajs/rostrum'

export default defineEventHandler(async (event) => {
    let contract
    let id
    let response
    let result

    /* Set block id. */
    // NOTE: Either txid or txidem.
    id = event.context.params.id
    console.log('ID', id)

    /* Set Nexa GraphQL endpoint. */
    const ENDPOINT = 'https://nexa.sh/graphql'

    const query = `
    {
        script(hash: "${id}") {
          pageInfo {
            metadata
          }
        }
      }
    `
    console.log('QUERY', query)

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
    console.log('RESULT', result)

    if (result?.data?.script?.pageInfo) {
        contract = result.data.script.pageInfo
    } else {
        contract = {}
    }
    console.log('CONTRACT', contract)

    // if (contract.confirmations === 0) {
    //     response = await getTransaction(contract.txid)
    //         .catch(err => console.error(err))
    //     // console.log('RESPONSE', response)

    //     // contract.extra = response
    //     contract.height = response.height
    //     contract.blockhash = response.blockhash
    //     contract.blocktime = response.blocktime
    //     contract.confirmations = response.confirmations
    //     contract.version = response.version
    //     contract.time = response.time
    //     contract.locktime = response.locktime
    // }

    /* Return contract. */
    return contract
})
