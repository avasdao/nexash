/* Import modules. */
import {
    BIP44Node,
    getBIP44AddressKeyDeriver,
} from '@metamask/key-tree'
import wif from 'wif'
// import {
//     CashAddressNetworkPrefix,
//     CashAddressType,
//     encodeCashAddress,
//     hash160,
// } from '../lib/libauth'


/**
 * Get Account
 *
 * TBD...
 */
export async function getAccount(network, index) {
    // https://github.com/satoshilabs/slips/blob/master/slip-0044.md
    const coinType = network === CashAddressNetworkPrefix.mainnet ? 0x7227 : 1
    const bip44Node = await snap.request({
        method: 'snap_getBip44Entropy',
        params: {
            coinType: coinType
        },
    })

    const derivePrivateKey = await getBIP44AddressKeyDeriver(
        bip44Node,
    )

    return derivePrivateKey(index)
}

/**
 * Node To Address
 *
 * TBD...
 */
export async function bip44NodeToCashaddr(
    account,
    networkPrefix,
    addrType,
) {
    const pkh = hash160(account.compressedPublicKeyBytes);

    return encodeCashAddress(networkPrefix, addrType, pkh as Uint8Array)
}

/**
 * Node To Wallet Import Format (WIF)
 *
 * TBD...
 */
export async function bip44NodeToWif(
    _account,
    _networkPrefix,
) {
    /* Set private key. */
    const privateKey = _account.privateKeyBytes

    /* Handle network prefix. */
    if (_networkPrefix === CashAddressNetworkPrefix.mainnet) {
        return wif.encode(128, privateKey, true)
    } else {
        return wif.encode(239, privateKey, true)
    }
}
