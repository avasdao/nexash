import {
    BIP44Node,
    getBIP44AddressKeyDeriver,
} from '@metamask/key-tree'
import wif from 'wif'
import {
    CashAddressNetworkPrefix,
    CashAddressType,
    encodeCashAddress,
    hash160,
} from '../lib/libauth'


export async function getAccount(network, index) {
    // https://github.com/satoshilabs/slips/blob/master/slip-0044.md
    const coinType = network === CashAddressNetworkPrefix.mainnet ? 145 : 1
    const bip44Node = await snap.request({
        method: 'snap_getBip44Entropy',
        params: {
            coinType: coinType
        },
    })

  const derivePrivateKey = await getBIP44AddressKeyDeriver(
    bip44Node,
  );
  return derivePrivateKey(index);
}


export async function bip44NodeToCashaddr(
  account: BIP44Node,
  networkPrefix: CashAddressNetworkPrefix,
  addrType: CashAddressType
): Promise<string> {

  const pkh = hash160(account.compressedPublicKeyBytes);
  return encodeCashAddress(networkPrefix, addrType, pkh as Uint8Array);
}

export async function bip44NodeToWif(
  account: BIP44Node,
  networkPrefix: CashAddressNetworkPrefix,
): Promise<string> {

  const privateKey = account.privateKeyBytes;
  if (networkPrefix == CashAddressNetworkPrefix.mainnet) {
    return wif.encode(128, privateKey, true)
  } else {
    return wif.encode(239, privateKey, true)
  }
}
