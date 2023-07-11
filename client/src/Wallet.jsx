import server from "./server";

import {secp256k1} from "ethereum-cryptography/secp256k1.js";

import { utf8ToBytes, toHex } from "ethereum-cryptography/utils.js";

function Wallet({ address, setAddress, balance, setBalance,privateKey,setPrivateKey }) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);
    const publicKey = secp256k1.getPublicKey(privateKey)
    console.log("publicKey----",publicKey);
    const address = toHex(secp256k1.getPublicKey(privateKey));
    // const address=""
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        private key
        <input placeholder="Type a private key" value={privateKey} onChange={onChange}></input>
      </label>
      <div>
        address : {address}
      </div>
      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
