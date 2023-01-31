<script setup>
useHead({
    title: 'Nexa Shell...',
    meta: [{
        name: 'description',
        content: 'Nexa Shell is redirecting, please wait...'
    }]
})

/* Initialize router. */
const route = useRoute()

/* Set slug. */
const slug = route.params.slug
console.log('SLUG', slug)

/* Validate for transaction. */
if (slug && typeof slug[0] !== 'undefined' && slug[0].length === 64) {
    /* Set transaction id. */
    const txid = slug[0]
    console.log('TXID', txid)

    // TODO: Validate transaction.

    /* Redirect to transaction page. */
    await navigateTo({ path: '/tx/' + txid })
}
</script>
