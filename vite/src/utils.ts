import { fromBase64, fromUtf8 } from "@cosmjs/encoding";

import { Any } from "cosmjs-types/google/protobuf/any";

import {
    MsgExecuteContract,
    MsgInstantiateContract,
} from "cosmjs-types/cosmwasm/wasm/v1/tx";
import { MsgSend } from "cosmjs-types/cosmos/bank/v1beta1/tx";
import { MsgVote } from "cosmjs-types/cosmos/gov/v1beta1/tx";

/**
 * Encodes a given string into a Base64 format suitable for message transactions.
 *
 * @param data - The input string to be encoded.
 * @returns The Base64-encoded version of the input string.
 */
export function encodeForMsgTx(data: string): string {
    const encoder = new TextEncoder();

    // 1: split the UTF-16 string into an array of bytes
    const charCodes = encoder.encode(data);

    // 2: concatenate byte data to create a binary string
    const concatenedStr = String.fromCharCode(...charCodes);

    // 3: base64 encode
    return btoa(concatenedStr);
}

/**
 * Decodes a transaction message based on its type URL.
 *
 * @param message - The transaction message, which includes a type URL and a value.
 * @returns An object containing the type URL and the decoded value of the message.
 */
export function decodeTxMessage(message: Any) {
    const { typeUrl, value } = message;

    // For contract instantiation messages from the CosmWasm module
    if (typeUrl === "/cosmwasm.wasm.v1.MsgInstantiateContract")
        return {
            typeUrl,
            value: decodeTxWasmMessageValue(
                MsgInstantiateContract.decode(value)
            ),
        };
    // For contract execution messages from the CosmWasm module
    else if (typeUrl === "/cosmwasm.wasm.v1.MsgExecuteContract")
        return {
            typeUrl,
            value: decodeTxWasmMessageValue(MsgExecuteContract.decode(value)),
        };
    // For sending tokens using the Cosmos bank module
    else if (typeUrl === "/cosmos.bank.v1beta1.MsgSend")
        return {
            typeUrl,
            value: MsgSend.decode(value),
        };
    // For voting on proposals using the Cosmos governance module
    else if (typeUrl === "/cosmos.gov.v1beta1.MsgVote")
        return {
            typeUrl,
            value: MsgVote.decode(value),
        };
    else {
        console.warn("unhandled typeUrl ", typeUrl);
        const decoder = new TextDecoder();
        return {
            typeUrl,
            value: decoder.decode(value), // Use a generic text decoder for the value
        };
    }
}

/**
 * Further decodes the `msg` field of a given CosmWasm transaction message value
 * that's of type `MsgInstantiateContract` or `MsgExecuteContract`.
 *
 * @param decodedValue - The preliminarily decoded message value.
 * @returns An object containing the original decoded value and the further decoded `msg` field.
 */
export function decodeTxWasmMessageValue(
    decodedValue: MsgInstantiateContract | MsgExecuteContract
) {
    // 1: convert the 'msg' field from a UTF-8 encoded byte array into a JSON object
    const msg = JSON.parse(fromUtf8(decodedValue.msg));

    // 2: if the parsed 'msg' object has a 'program' field, decode the Prolog program
    if (msg?.program) msg.programDecoded = decodePrologProgram(msg.program);

    // 3: return the original 'decodedValue' object and the further decoded 'msg' object.
    return {
        ...decodedValue,
        msg,
    };
}

/**
 * Decodes a Prolog program that is provided as a Base64-encoded UTF-8 string.
 *
 * @param program - A Base64-encoded UTF-8 string representing a Prolog program.
 * @returns The decoded Prolog program as a string.
 */
export function decodePrologProgram(program: string): string {
    // 1: ensures that the program string is a valid Base64 encoded string
    // by appending the necessary "=" characters to make its length a multiple of 4
    const missingChars = program.length % 4;
    if (missingChars > 0) {
        for (let index = 0; index < missingChars; index++) {
            program += "=";
        }
    }

    // 2: decode the program string from Base64 format
    const utf8Program = fromBase64(program);

    // 3: decode from UTF-8 encoded byte array into a string
    return fromUtf8(utf8Program);
}
