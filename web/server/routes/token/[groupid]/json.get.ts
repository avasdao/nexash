export default defineEventHandler(async (event) => {
    /* Set block id. */
    // NOTE: Either height or hash.
    const groupid = event.context.params.groupid

    /* Return block. */
    return {
        hi: 'Json!',
        groupid,
    }
})
