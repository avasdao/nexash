import { LibauthOutput } from 'cashscript/dist/interfaces';
import {
  TransactionCommon, importAuthenticationTemplate, TransactionTemplateFixed,
  authenticationTemplateP2pkhNonHd, authenticationTemplateToCompilerBCH,
  generateTransaction, encodeTransaction, lockingBytecodeToCashAddress, disassembleBytecodeBCH, hash256
} from '../lib/libauth';
import { createSighashPreimage } from '../lib/cashscript/utils';
import { SignatureTemplate } from '../lib/cashscript/SignatureTemplate';

export function makeSignedTx(unsignedTxCmn: TransactionCommon,
  sourceOutputs: any[],
  privateKey: Uint8Array): [Uint8Array, string] {
  const signedTx = signUnsignedTransaction(unsignedTxCmn, sourceOutputs, privateKey);
  const signedTxHex = Buffer.from(signedTx).toString('hex');
  return [signedTx, signedTxHex];
}

interface SourceOutput {
  valueSatoshis: bigint;
  cashAddress?: string;
  token?: {
    amount: bigint;
    category: Uint8Array;
    nft?: {
      capability: "none" | "mutable" | "minting";
      commitment: Uint8Array;
    };
  }
}
function signUnsignedTransaction(
  decoded: TransactionCommon,
  sourceOutputs: SourceOutput[],
  signingKey: Uint8Array
): Uint8Array {

  const template = importAuthenticationTemplate(
    authenticationTemplateP2pkhNonHd
  );
  if (typeof template === "string") {
    throw new Error("Transaction template error");
  }

  const compiler = authenticationTemplateToCompilerBCH(template);
  const transactionTemplate: Readonly<
    TransactionTemplateFixed<typeof compiler>
  > = { ...decoded };
  for (const [index, input] of decoded.inputs.entries()) {
    if (input.unlockingBytecode.byteLength > 0) {
      continue;
    }

    const sourceOutput = sourceOutputs[index];
    transactionTemplate.inputs[index] = {
      ...input,
      unlockingBytecode: {
        compiler,
        data: {
          keys: { privateKeys: { key: signingKey } },
        },
        valueSatoshis: sourceOutput.valueSatoshis,
        script: "unlock",
        token: sourceOutput.token,
      },
    };
  }

  const result = generateTransaction(transactionTemplate);
  if (!result.success) {
    throw result.errors;
  }

  return encodeTransaction(result.transaction);
}


export function extractOutputs(
  tx: TransactionCommon,
  network: "bitcoincash" | "bchtest" | "bchreg"
): SourceOutput[] {
  let outputs: SourceOutput[] = [];
  for (const out of tx.outputs) {
    let result = lockingBytecodeToCashAddress(out.lockingBytecode, network);
    if (typeof result !== "string") {
      result = disassembleBytecodeBCH(out.lockingBytecode)
    }
    const entry: SourceOutput = {
      valueSatoshis: out.valueSatoshis,
      cashAddress: result as string,
      token: out.token,
    };
    outputs.push(entry);
  }
  return outputs;
}


export function signTransactionForArg(
  decoded: TransactionCommon,
  sourceOutputs: LibauthOutput[],
  i: number,
  bytecode: Uint8Array,
  signingKey: Uint8Array
): Uint8Array {
  const template = new SignatureTemplate(signingKey);

  const hashtype = template.getHashType();
  const preimage = createSighashPreimage(decoded, sourceOutputs, i, bytecode, hashtype);
  const sighash = hash256(preimage);

  const signature = template.generateSignature(sighash);
  return signature
}
