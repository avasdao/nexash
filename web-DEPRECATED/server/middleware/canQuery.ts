export default defineEventHandler((event) => {
    /* Set (request) query. */
    const query = getQuery(event)
    // console.log('canQuery (query):', query)

    if (query?.query) {
        // NOTE: Accepted
        setResponseStatus(event, 202)

        return 'ok'
        // return 'no'
        // return 'data required'
    }
})
