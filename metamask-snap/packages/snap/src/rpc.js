import { copyable, divider, heading, panel, text } from '@metamask/snaps-ui';
import { bip44NodeToCashaddr, bip44NodeToWif, getAccount } from './rpc/account';
import { CashAddressNetworkPrefix, CashAddressType, TransactionCommon } from "./lib/libauth";
import { unPack } from "./utils/serialize";
import { SignTransactionParams } from "./rpc-types";
import { extractOutputs, makeSignedTx, signTransactionForArg as signTransactionForArg_ } from "./rpc/transaction";
import { formatUnits } from "./utils/unit";
import { getAddressIndex, updateAddressIndex } from './rpc/address-index';

export async function getAddress(origin: string, { network }: { network: keyof typeof CashAddressNetworkPrefix }): Promise<string> {
  const networkPrefix: CashAddressNetworkPrefix = CashAddressNetworkPrefix[network]
  const account = await getAccount(networkPrefix, await getAddressIndex(origin, network));
  return await bip44NodeToCashaddr(account, networkPrefix, CashAddressType.p2pkh);
}

export async function getPublicKey(origin: string, { network }: { network: keyof typeof CashAddressNetworkPrefix }): Promise<string> {
  const networkPrefix: CashAddressNetworkPrefix = CashAddressNetworkPrefix[network]
  const account = await getAccount(networkPrefix, await getAddressIndex(origin, network));
  return account.publicKey;
}

export async function showWIF(origin: string, { network }: { network: keyof typeof CashAddressNetworkPrefix }) {
  const networkPrefix: CashAddressNetworkPrefix = CashAddressNetworkPrefix[network]
  const account = await getAccount(networkPrefix, await getAddressIndex(origin, network));
  const wif = await bip44NodeToWif(account, networkPrefix);

  const confirmationResponse = await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'confirmation',
      content: panel([
        heading('Warning!'),
        text('Do you really want to show the WIF private key?'),
        text('Never disclose this key. Anyone with your private keys can steal any assets held in your account.'),
      ]),
    },
  });

  if (confirmationResponse !== true) {
    return confirmationResponse
  }

  await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'alert',
      content: panel([
        heading('Keep your private key safe.'),
        copyable(wif),
        text('Your Private Key provides full access to your wallet and funds.'),
        text('Do not share this with anyone. MetaMask Support will not request this, but phishers might.'),
      ]),
    },
  });
  return true
}


function getPanelContents(networkPrefix: CashAddressNetworkPrefix, address: string, unsignedTx: { transaction: TransactionCommon, sourceOutputs: any }) {
  function toHex(data: Uint8Array | string) {
    if (typeof data === "object") {
      return Buffer.from(data).toString("hex")
    }
    return data
  }

  const panelContents = [
    divider(),
    text(`**Current Account:**`),
    copyable(address),
    divider(),
  ]

  let inputBchVal: bigint = 0n;
  let outputBchVal: bigint = 0n;
  for (const [index, input] of unsignedTx.transaction.inputs.entries()) {
    const src = unsignedTx.sourceOutputs[index];
    if (input.unlockingBytecode.byteLength > 0) {
      panelContents.push(
        text(`**Input#${index}**`)
      );
    } else {
      panelContents.push(
        text(`**Input#${index} (My UTXO)**`)
      );
    }
    inputBchVal = inputBchVal + BigInt(src.valueSatoshis);
    const currentBch = Number(formatUnits(src.valueSatoshis, 8));
    panelContents.push(
      text(`Value: ${currentBch} BCH`)
    );

    if (src.token) {
      panelContents.push(
        text(`With Token`),
        text(`Category: ${toHex(src.token!.category)}`),
        text(`Amount: ${src.token!.amount}`)
      );
      if (src.token!.nft) {
        panelContents.push(
          text(`Capability: ${src.token!.nft!.capability}`),
          text(`Commitment: ${toHex(src.token!.nft!.commitment)}`)
        );
      }
    }
  }

  const outputs = extractOutputs(unsignedTx.transaction, networkPrefix);
  for (const [index, output] of outputs.entries()) {
    if (output.cashAddress !== address) {
      panelContents.push(
        text(`**Output#${index}**`),
        text(`To Address: ${output.cashAddress}`)
      );
    } else {
      panelContents.push(
        text(`**Output#${index} (My UTXO)**`)
      );
    }
    outputBchVal += output.valueSatoshis;
    const currentBch = Number(formatUnits(Number(output.valueSatoshis), 8));
    panelContents.push(
      text(`Value: ${currentBch} BCH`)
    );

    if (output.token) {
      panelContents.push(
        text(`With Token`),
        text(`Category: ${toHex(output.token!.category)}`),
        text(`Amount: ${output.token!.amount}`)
      );
      if (output.token!.nft) {
        panelContents.push(
          text(`Capability: ${output.token!.nft!.capability}`),
          text(`Commitment: ${toHex(output.token!.nft!.commitment)}`)
        );
      }
    }
  }

  panelContents.push(
    divider(),
    text(`**Miner Fee**: ${Number(inputBchVal - outputBchVal)} sats\n`)
  );
  return panelContents
}


export async function signTransaction(origin: string, { unsignedTx, network }: SignTransactionParams): Promise<string> {
  const unsignedTxObj = unPack(unsignedTx);
  const unsignedTxCmn = unsignedTxObj.transaction as TransactionCommon

  const networkPrefix: CashAddressNetworkPrefix = CashAddressNetworkPrefix[network]
  const account = await getAccount(networkPrefix, await getAddressIndex(origin, network));
  const address = await bip44NodeToCashaddr(account, networkPrefix, CashAddressType.p2pkh);

  let panelContents: any = [
    heading('Confirm Transaction'),
  ];
  panelContents = panelContents.concat(getPanelContents(networkPrefix, address, unsignedTxObj))

  const confirmationResponse = await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'confirmation',
      content: panel(panelContents),
    },
  });

  if (confirmationResponse !== true) {
    throw new Error('Transaction must be approved by user');
  }

  const [signedTx, signedTxHex] = makeSignedTx(unsignedTxCmn, unsignedTxObj.sourceOutputs, account.privateKeyBytes!);
  return signedTxHex;
}

export async function signTransactionForArg(origin: string, { unsignedTx, network }: SignTransactionParams): Promise<string> {
  const networkPrefix: CashAddressNetworkPrefix = CashAddressNetworkPrefix[network]
  const account = await getAccount(networkPrefix, await getAddressIndex(origin, network));
  const address = await bip44NodeToCashaddr(account, networkPrefix, CashAddressType.p2pkh);

  const unsignedTxObj = unPack(unsignedTx);

  let panelContents: any = [
    heading('Sign Transaction'),
  ];
  panelContents = panelContents.concat(getPanelContents(networkPrefix, address, unsignedTxObj))

  const { transaction, sourceOutputs, inputIndex, bytecode } = unsignedTxObj;

  panelContents.push(
    divider(),
    text(`**InputIndex**: ${inputIndex} \n`)
  )

  panelContents.push(
    text(`**Bytecode**: ${Buffer.from(bytecode).toString("hex")}\n`)
  )

  const confirmationResponse = await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'confirmation',
      content: panel(panelContents),
    },
  });

  if (confirmationResponse !== true) {
    throw new Error('Transaction must be approved by user');
  }

  const signedTx = await signTransactionForArg_(transaction, sourceOutputs, inputIndex, bytecode, account.privateKeyBytes!);
  const signedTxHex = Buffer.from(signedTx).toString('hex');
  return signedTxHex;
}

export async function switchAddress(origin: string, { network }: { network: keyof typeof CashAddressNetworkPrefix }): Promise<string | boolean | null> {
  const maxAddressesCount = 20
  const addresses = await Promise.all(new Array(maxAddressesCount).fill(0).map(async (_, i) => {
    const networkPrefix: CashAddressNetworkPrefix = CashAddressNetworkPrefix[network]
    const account = await getAccount(networkPrefix, i);
    return await bip44NodeToCashaddr(account, networkPrefix, CashAddressType.p2pkh);
  }))

  let input = await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'prompt',
      content: panel([
        heading(`${origin} is asking to switch to another address.`),
        divider(),
        text(`**Which address would you like to switch to?**`),
        ...addresses.map((address, i) => copyable(text(`${i + 1}.   ${address}`))),
        divider(),
        text('Please enter the address or its number shown above.'),
      ]),
      placeholder: ' ',
    },
  })
  if (!input) {
    return false
  }
  let index = addresses.findIndex(x => (input as string).includes(x))
  if (index <= -1) {
    const numIndex = parseInt(input as string)
    if (numIndex != Number(input) || numIndex <= 0 || numIndex > maxAddressesCount) {
      throw new Error(`Please enter an integer from 1 to ${maxAddressesCount}`);
    }
    index = numIndex - 1
  }
  await updateAddressIndex(origin, network, index)
  return addresses[index]
}
