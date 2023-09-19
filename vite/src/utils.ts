export function encodeForMsgTx(data: string): string {
    const encoder = new TextEncoder();

    // 1: split the UTF-16 string into an array of bytes
    const charCodes = encoder.encode(data);

    // 2: concatenate byte data to create a binary string
    const concatenedStr = String.fromCharCode(...charCodes);

    // 3: base64 encode
    return btoa(concatenedStr);
}
