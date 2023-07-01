export default defineEventHandler(async (event) => {
    // NOTE: We use this proxy to allow CORS requests.
    return await $fetch('https://tokenapi.otoplo.com/api/v1/tokens/top?max=20')
        .catch(err => console.error(err))
})
