import {secp256k1} from "ethereum-cryptography/secp256k1.js";

import hashMessage from "./hashMessage";

async function signMessage(msg,privateKey) {
    return secp256k1.sign(msg, privateKey);
}

export default signMessage