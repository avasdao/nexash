/* Import modules. */
import { getTransaction } from '@nexajs/rostrum'

export default defineEventHandler(async (event) => {
    let contract
    let id
    let result

    /* Set block id. */
    // NOTE: Either txid or txidem.
    id = event.context.params.id

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

    if (result?.data?.script?.pageInfo?.metadata) {
        contract = result.data.script.pageInfo.metadata

        try {
            /* Set contract details. */
            contract = JSON.parse(contract)
        } catch (err) {
            console.error(err)
        }
    } else {
        contract = {}
    }
    // console.log('CONTRACT', contract)


    /* Return contract (metadata). */
    return contract
})
