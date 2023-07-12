const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { hexToBytes, toHex } = require("ethereum-cryptography/utils");

/**
 * Hash a message using KECCAK-256
 * @param message the message to hash.
 * @returns the hash of the message.
 */
const hashMessage = (message) => keccak256(Uint8Array.from(message));

/**
 * Convert a public key to an address
 * @param pubKey the public key.
 * @returns the address in hexa format.
 */
const pubKeyToAddress = (pubKey) => {
  const hash = keccak256(pubKey.slice(1));
  return toHex(hash.slice(-20)).toUpperCase();
};

/**
 * Get the public key from the signature.
 * @param message the message.
 * @param signature the signature in hexa format with the recovery bit as the first byte.
 * @return the public key.
 */
const signatureToPubKey = (message, signature) => {
  const hash = hashMessage(message);
  const fullSignatureBytes = hexToBytes(signature);
  const recoveryBit = fullSignatureBytes[0];
  const signatureBytes = fullSignatureBytes.slice(1);

  return secp.recoverPublicKey(hash, signatureBytes, recoveryBit);
};

module.exports = {
    hashMessage,
    pubKeyToAddress,
    signatureToPubKey,
  };