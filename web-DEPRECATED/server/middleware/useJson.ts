export default defineEventHandler((event) => {
    /* Set (request) query. */
    const query = getQuery(event)
    // console.log('canQuery (query):', query)

    if (query?.json) {
        return {
            hi: 'JSON query!',
        }
    }
})
