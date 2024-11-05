import { CashAddressNetworkPrefix } from "../lib/libauth";

function getKey(origin: string, network: keyof typeof CashAddressNetworkPrefix) {
    return `${origin}-${network}`
}

export async function getAddressIndex(origin: string, network: keyof typeof CashAddressNetworkPrefix): Promise<number> {
    const persistedData = await snap.request({
        method: 'snap_manageState',
        params: { operation: 'get' },
    });
    return persistedData  && (persistedData[getKey(origin, network)] as number) || 0
}

export async function updateAddressIndex(origin: string, network: keyof typeof CashAddressNetworkPrefix, index: number): Promise<number> {
    let persistedData = await snap.request({
        method: 'snap_manageState',
        params: { operation: 'get' },
    });
    if (!persistedData) {
        persistedData = {}
    }
    persistedData[getKey(origin, network)] = index
    // Persist some data.
    await snap.request({
        method: 'snap_manageState',
        params: { operation: 'update', newState: persistedData },
    })
    return index
}