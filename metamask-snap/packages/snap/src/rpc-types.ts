import { CashAddressNetworkPrefix } from './lib/libauth';
import * as rpcMethods from './rpc';

type RpcMethods = typeof rpcMethods;
type InferArgs<M extends keyof RpcMethods> = RpcMethods[M] extends (
  ...args: infer A
) => unknown
  ? A[0]
  : never;

export type RpcMethodTypes = {
  [Method in keyof RpcMethods]: {
    input: InferArgs<Method>;
    output: ReturnType<RpcMethods[Method]>;
  };
};

// ----------------------------------------------------------------

export type Network = keyof typeof CashAddressNetworkPrefix

export function assertIsGetAddressParams(
  params: unknown,
): asserts params is {network: Network} {
  if (
    !(
      typeof params === 'object' &&
      params !== null &&
      'network' in params &&
      typeof params.network === 'string'
    )
  ) {
    throw new Error('params must be instance of `MakeTransactionParams`');
  }
}


// ----------------------------------------------------------------
export type SignTransactionParams = {
  unsignedTx: string;
  network: Network
};

export function assertIsSignTransactionParams(
  params: unknown,
): asserts params is SignTransactionParams {
  if (
    !(
      typeof params === 'object' &&
      params !== null &&
      'unsignedTx' in params &&
      typeof params.unsignedTx === 'string'
    )
  ) {
    throw new Error('params must be instance of `MakeTransactionParams`');
  }
}
