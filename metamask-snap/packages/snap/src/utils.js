/**
 * ASSERTION: Get Address Parameters
 *
 * TBD...
 */
export function assertIsGetAddressParams(_params) {
    if (!(
        typeof params === 'object' &&
        params !== null &&
        'network' in params &&
        typeof params.network === 'string'
    )) {
        throw new Error('Oops! Parameters MUST be an instance of `MakeTransactionParams`.')
    }
}

/**
 * ASSERTION: Sign Transaction Parameters
 *
 * TBD...
 */
export function assertIsSignTransactionParams(_params) {
    if (!(
        typeof _params === 'object' &&
        _params !== null &&
        'rawTx' in _params &&
        typeof _params.rawTx === 'string'
    )) {
        throw new Error('Oops! Your parameters MUST be an instance of `MakeTransactionParams`.')
    }
}
