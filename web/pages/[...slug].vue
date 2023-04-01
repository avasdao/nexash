<script setup>
useHead({
    title: 'NexaShell...',
    meta: [{
        name: 'description',
        content: 'NexaShell is redirecting, please wait...'
    }]
})

/* Initialize router. */
const route = useRoute()

/* Set slug. */
const slug = route.params.slug?.[0]
console.log('SLUG', slug)

/* Set redirection flag. */
let isRedirect = false

/* Validate for transaction. */
if (slug && typeof slug[0] !== 'undefined' && slug[0].length === 64) {
    /* Set transaction id. */
    const txid = slug[0]
    console.log('TXID', txid)

    // TODO: Validate transaction.

    /* Redirect to transaction page. */
    await navigateTo({ path: '/tx/' + txid })
}

if (slug[0].slice(0, 7) === 'nexa:tr') {
    /* Set group id. */
    const groupid = slug[0]
    console.log('TOKEN ID', groupid)

    // TODO: Validate token.

    /* Redirect to token page. */
    await navigateTo({ path: '/token/' + groupid })
}
</script>

<template>
    <main v-if="isRedirect" class="max-w-lg mx-auto py-10 flex justify-center">
        <h1 class="text-2xl font-light">
            Redirecting, please wait...
        </h1>
    </main>

    <main v-else class="w-full px-3 py-10">
        <section class="max-w-5xl mx-auto flex flex-col gap-4">
            <h1 class="text-4xl font-medium">
                Search not found
            </h1>

            <p class="w-full lg:w-1/2">
                Oops! [ <span class="text-rose-500 font-bold">{{slug}}</span> ] is an invalid search string.
                If you think this is a problem with NexaShell, please <NuxtLink to="/contact" class="text-blue-500 font-medium hover:underline">let us know</NuxtLink>.
            </p>

            <NuxtLink to="/" class="px-5 py-2 w-fit bg-blue-900 border-4 border-blue-500 rounded-lg shadow-md">
                <span class="text-blue-100 font-medium">
                    Back Home
                </span>
            </NuxtLink>

        </section>
    </main>
</template>
