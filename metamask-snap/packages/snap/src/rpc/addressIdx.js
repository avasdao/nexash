/**
 * Get (Persisted Data) Key
 *
 * Retrieves the (persisted data) key associated with a specific
 * origin and network.
 */
const getKey = (
    _origin,
    _network,
) => {
    /* Return (persisted data) key. */
    return `${_origin}-${_network}`
}

/**
 * Get Address Index
 *
 * TBD...
 */
export async function getAddressIndex(
    _origin,
    _network
) {
    /* Request persisted data. */
    const persistedData = await snap.request({
        method: 'snap_manageState',
        params: { operation: 'get' },
    })

    /* Return (address) index. */
    return persistedData && (persistedData[getKey(_origin, _network)]) || 0
}

/**
 * Update Address Index
 *
 * TBD...
 */
export async function updateAddressIndex(
    _origin,
    _network,
    _index,
) {
    /* Initialize locals. */
    let persistedData

    /* Request persisted data. */
    persistedData = await snap.request({
        method: 'snap_manageState',
        params: { operation: 'get' },
    })

    /* Validate persisted data. */
    if (!persistedData) {
        /* Initialize persisted data (handler). */
        persistedData = {}
    }

    /* Set persisted data. */
    persistedData[getKey(_origin, _network)] = _index

    /* Update persisted data. */
    await snap.request({
        method: 'snap_manageState',
        params: {
            operation: 'update',
            newState: persistedData,
        },
    })

    /* Return (address) index. */
    return _index
}
