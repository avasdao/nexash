<script setup>
useHead({
    title: 'Block - NexaShell',
    meta: [{
        name: 'description',
        content: 'Block'
    }]
})

const route = useRoute()

console.log('ROUTE PARAMS', route.params)

const blocknum = route.params.blocknum

/* Set Nexa GraphQL endpoint. */
const ENDPOINT = 'https://nexa.sh/graphql'

const query = `
{
    block(height: [${blocknum}]) {
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


/* Make query request. */
const block = await $fetch(ENDPOINT,
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ query }),
    })
    .catch(err => console.error(err))

</script>

<template>
    <main class="">
        <main class="max-w-7xl mx-auto">
            <h1 class="text-4xl font-medium">
                Block
            </h1>

            <p>
                {{blocknum}}
            </p>

            <pre>{{JSON.stringify(block, null, 2)}}</pre>
        </main>
    </main>
</template>
