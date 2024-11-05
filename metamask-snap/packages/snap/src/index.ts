import { OnRpcRequestHandler } from '@metamask/snaps-types';
import { getAddress, showWIF, getPublicKey, signTransaction, signTransactionForArg, switchAddress } from './rpc';
import { assertIsGetAddressParams, assertIsSignTransactionParams } from "./rpc-types";

export * from './rpc-types';
export const onRpcRequest: OnRpcRequestHandler = async ({ request, origin }) => {
  switch (request.method) {
    case 'bch_getAddress':
      assertIsGetAddressParams(request.params)
      return await getAddress(origin, request.params);
    case 'bch_showWIF':
      assertIsGetAddressParams(request.params)
      return await showWIF(origin, request.params);
    case 'bch_getPublicKey':
      assertIsGetAddressParams(request.params)
      return await getPublicKey(origin, request.params);
    case 'bch_signTransaction':
      assertIsSignTransactionParams(request.params)
      return await signTransaction(origin, request.params);
    case 'bch_signTransactionForArg':
      assertIsSignTransactionParams(request.params)
      return await signTransactionForArg(origin, request.params);
    case 'bch_switchAddress':
      assertIsGetAddressParams(request.params)
      return await switchAddress(origin, request.params);
    default:
      throw new Error('Method not found.');
  }
};
