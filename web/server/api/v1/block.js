export default defineEventHandler(async (event) => {
    /* Set (request) query. */
    const query = getQuery(event)
    console.log('QUERY', query)

    return { query }

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

    return query
})
