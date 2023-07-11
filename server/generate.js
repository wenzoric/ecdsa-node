const { randomBytes } = require("crypto")
const secp2 = require("ethereum-cryptography/secp256k1-compat")
const {toHex} = require("ethereum-cryptography/utils")

// private key
let privKey
do {
    privKey = randomBytes(32)
}while (!secp2.privateKeyVerify(privKey))
    console.log("Private key:", toHex(privKey))

// Derive public key 
let pubKey = secp2.publicKeyCreate(privKey)
console.log("Public key:", toHex(pubKey))