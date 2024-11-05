# Nexa Connect

### A simple & effective MetaMask Snap for the Nexa community

### https://connect.nexa.sh



## RPC Methods

### `getAddress`

Get current NEXA cash address.

#### Parameters

```js
{
  network: 'mainnet' | 'testnet'
}
```

### `switchAddress`

Switch bch address (based on BIP32) and cache index to browser (based on snap manage state).

The current address used by each dApp are stored independently of each other.

#### Parameters

```js
{
  network: 'mainnet' | 'testnet'
}
```

### `getPublicKey`

Get current NEXA cash address’s public key.

#### Parameters

```js
{
  network: 'mainnet' | 'testnet'
}
```

### `signTransaction`
> NOTE: Requires a properly constructed `Transaction` _(i.e. provided with
>       valid Inputs and Outputs)_.

#### Parameters

```js
{
  network: 'mainnet' | 'testnet',
}
```

### `signRawTransaction`
> NOTE: This method is intended to solve the problem of passing `SignatureTemplate` parameter.

#### Parameters

```js
{
  network: 'mainnet' | 'testnet',
  rawTx: string,
}
```

### `showWif`
> NOTE: This method DOES NOT return the user's private key to the dApp.
>       It is for MetaMask’s display only.

Show WIF private key in snap window.

#### Parameters

```js
{
  network: 'mainnet' | 'testnet'
}
```


## Additional Information

#### The original `rawTx` is an object like this:

`TransactionCommon` can be found here:  
https://github.com/bitauth/libauth/blob/master/src/lib/message/transaction-types.ts#L245

`SourceOutput` can be found here:  
https://github.com/mainnet-cash/mainnet-js/blob/1.1.28/packages/mainnet-js/src/wallet/model.ts#L317
```js
import { Transaction } from '@nexajs/connect'
import { SourceOutput } from '@nexajs/connect'

export UnsignedTx = {
  transaction   : TransactionCommon,
  sourceOutputs : SourceOutput[],
}
```

#### When `rawTx` is a string using `pack()`, you may reference the following code:

```js
export function pack(_tx) {
  return JSON.stringify(
    _tx,
    (_, value) => typeof value === 'bigint' ? `${value.toString()}` : value
  )
}

export function unPack(_txStr) {
  return JSON.parse(_txStr, function (key, value) {
    if (!!value && typeof value === 'object') {
      const keys = Object.keys(value)
      const values = Object.values(value)

      const b = keys
        .every((_v) => typeof Number(_v) === 'number') && values
          .every((_v) => typeof _v === 'number')

      if (!b) {
        return value
      }

      return new Uint8Array(values as any);
    }

    if ([ 'token', 'nft' ].includes(key) && value === null) {
      return undefined
    }

    if ([ 'valueSatoshis', 'amount' ].includes(key)) {
      return BigInt(value)
    }

    return value
  })
}
```
