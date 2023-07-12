

import { keccak256 } from "ethereum-cryptography/keccak.js";
import { utf8ToBytes, toHex } from "ethereum-cryptography/utils.js";


function hashMessage(message) {
    return toHex(keccak256(utf8ToBytes(message))); 
}

export default hashMessage