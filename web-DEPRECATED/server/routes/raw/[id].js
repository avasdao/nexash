export default defineEventHandler((event) => {
    /* Set (invalid) path URL. */
    const id = event.context.params.id
    console.log('RAW (id):', id)

    return `Returning raw data for [ ${id} ]`

    /* Set (request) query. */
    const query = getQuery(event)
    console.log('/raw (query):', query)

    if (query?.chalby) {
        const challengeBy = query.chalby
        console.log('CHALLENGE BY', challengeBy)
    }

    return {
        raw: '0122333444455555666666777777788888888999999999',
    }
})
