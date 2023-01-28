function sleep(_ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, _ms)
    })
}

module.exports = {
    sleep,
}
