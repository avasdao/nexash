<script setup>
useHead({
    title: 'Token - NexaShell',
    meta: [{
        name: 'description',
        content: 'Token'
    }]
})

const route = useRoute()

console.log('ROUTE PARAMS', route.params)

const groupid = route.params.groupid

/* Set Nexa GraphQL endpoint. */
const ENDPOINT = 'https://nexa.sh/graphql'

const query = `
{
    token(groupid: [${groupid}]) {
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

let token

/* Make query request. */
// const result = await $fetch(ENDPOINT,
//     {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json',
//         },
//         body: JSON.stringify({ query }),
//     })
//     .catch(err => console.error(err))

// if (result?.data?.token) {
//     token = result.data.token[0]
// }

// FOR DEV ONLY
token = {}
</script>

<template>
    <main v-if="token" class="">
        <main class="max-w-7xl mx-auto">
            <h1 class="text-4xl font-medium">
                Token
            </h1>

            <TokenItem
                title="Group ID"
                :value="groupid"
            />

            <TokenItem
                title="Confirmations"
                :value="token.confirmations"
            />

            <TokenItem
                title="Height"
                :value="token.height"
            />

            <pre>{{JSON.stringify(token, null, 2)}}</pre>
        </main>
    </main>

    <main v-else class="max-w-7xl mx-auto">
        <div class="p-5 flex w-full justify-center">
            <h1 class="text-4xl font-medium">
                Oops! No token found
            </h1>
        </div>
    </main>
</template>
