import server from "./server";

import * as secp2 from 'ethereum-cryptography/secp256k1-compat';

import {toHex} from 'ethereum-cryptography/utils'

function Wallet({ address, setAddress, balance, setBalance,privateKey,setPrivateKey }) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);
    const address = toHex(secp2.publicKeyCreate(privateKey));
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
