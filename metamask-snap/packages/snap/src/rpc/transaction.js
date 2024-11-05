/* Import modules. */
import { LibauthOutput } from 'cashscript/dist/interfaces'
// import {
//   TransactionCommon,
//   importAuthenticationTemplate,
//   TransactionTemplateFixed,
//   authenticationTemplateP2pkhNonHd,
//   authenticationTemplateToCompilerBCH,
//   generateTransaction,
//   encodeTransaction,
//   lockingBytecodeToCashAddress,
//   disassembleBytecodeBCH,
//   hash256,
// } from '../lib/libauth'
import { createSighashPreimage } from '../lib/cashscript/utils'
import { SignatureTemplate } from '../lib/cashscript/SignatureTemplate'

export function makeSignedTx(
    unsignedTxCmn,
    sourceOutputs,
    privateKey,
) {
    const signedTx = signUnsignedTransaction(unsignedTxCmn, sourceOutputs, privateKey)
    const signedTxHex = Buffer.from(signedTx).toString('hex')

    return [signedTx, signedTxHex]
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
        }
    }
}

/**
 * Sign (Unsigned) Transaction
 *
 * TBD...
 */
function signUnsignedTransaction(
    decoded,
    sourceOutputs,
    signingKey,
) {
    const template = importAuthenticationTemplate(
        authenticationTemplateP2pkhNonHd
    )

    if (typeof template === "string") {
        throw new Error("Transaction template error")
    }

    const compiler = authenticationTemplateToCompilerBCH(template)
    // const transactionTemplate: Readonly<
    //     TransactionTemplateFixed<typeof compiler>
    //     > = { ...decoded }

    for (const [index, input] of decoded.inputs.entries()) {
        if (input.unlockingBytecode.byteLength > 0) {
            continue;
        }

        const sourceOutput = sourceOutputs[index]

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
        }
    }

    const result = generateTransaction(transactionTemplate)

    if (!result.success) {
        throw result.errors
    }

    return encodeTransaction(result.transaction)
}

/**
 * Extract Outputs
 *
 * TBD...
 */
export function extractOutputs(
    tx,
    network,
) {
    let outputs: SourceOutput[] = []

    for (const out of tx.outputs) {
        let result = lockingBytecodeToCashAddress(out.lockingBytecode, network)

        if (typeof result !== "string") {
            result = disassembleBytecodeBCH(out.lockingBytecode)
        }

        const entry: SourceOutput = {
            valueSatoshis: out.valueSatoshis,
            cashAddress: result as string,
            token: out.token,
        }

        outputs.push(entry)
    }

    return outputs
}

/**
 * Sign (Raw) Transaction
 *
 * TBD...
 */
export function signRawTransaction(
    decoded,
    sourceOutputs,
    i,
    bytecode,
    signingKey,
) {
    const template = new SignatureTemplate(signingKey)

    const hashtype = template.getHashType()

    const preimage = createSighashPreimage(
        decoded, sourceOutputs, i, bytecode, hashtype)

    const sighash = hash256(preimage)

    const signature = template.generateSignature(sighash)

    return signature
}
