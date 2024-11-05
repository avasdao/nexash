/* Import modules. */
import { OnRpcRequestHandler } from '@metamask/snaps-types'
import {
    getAddress,
    getPublicKey,
    showWif,
    signTransaction,
    signTransactionForArg,
    switchAddress,
} from './rpc.js'
import {
    assertIsGetAddressParams,
    assertIsSignTransactionParams,
} from './utils.js'
export * from './utils.js'


/**
 * RPC Request (Handler)
 *
 * Manages remote procedure calls (RPCs) to the Snaps engine.
 */
export const OnRpcRequest = async ({ request, origin }) => {
    /* Hanlde request method. */
    switch (request.method) {
        case 'bch_getAddress':
            assertIsGetAddressParams(request.params)
            return await getAddress(origin, request.params)
        case 'bch_getPublicKey':
            assertIsGetAddressParams(request.params)
            return await getPublicKey(origin, request.params)
        case 'bch_showWif':
            assertIsGetAddressParams(request.params)
            return await showWif(origin, request.params)
        case 'bch_signTransaction':
            assertIsSignTransactionParams(request.params)
            return await signTransaction(origin, request.params)
        case 'bch_signRawTransaction':
            assertIsSignTransactionParams(request.params)
            return await signRawTransaction(origin, request.params)
        case 'bch_switchAddress':
            assertIsGetAddressParams(request.params)
            return await switchAddress(origin, request.params)
        default:
            throw new Error('Oops! That method DOES NOT exist.')
    }
}
