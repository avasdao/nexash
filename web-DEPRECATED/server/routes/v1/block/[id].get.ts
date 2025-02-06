export default defineEventHandler(async (event) => {
    /* Set block id. */
    // NOTE: Either height or hash.
    const blockid = event.context.params.id

    /* Set Nexa GraphQL endpoint. */
    const ENDPOINT = 'https://nexa.sh/graphql'

    const query = `
    {
        block(height: [${blockid}]) {
        hash
        confirmations
        height
        size
        txcount
        feePoolAmt
        merkleroot
        time
        mediantime
        nonce
        bits
        difficulty
        chainwork
        utxoCommitment
        minerData
        status
        onMainChain
        ancestorhash
        nextblockhash
        txid
        txidem
      }
    }
    `

    let block

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

    if (result?.data?.block) {
        block = result.data.block[0]
    } else {
        block = {}
    }

    /* Return block. */
    return block
})
