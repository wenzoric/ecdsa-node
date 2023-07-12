import { useState } from "react";
import server from "./server";
import hashMessage from "./hashMessage";
import signMessage from "./signMessage";

import { utf8ToBytes, toHex } from "ethereum-cryptography/utils.js";

function Transfer({ address, setBalance ,privateKey}) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();
   
    const  message = JSON.stringify({
      sender: address,
      amount: parseInt(sendAmount),
      recipient,
    });
    console.log('message:',message);
    //messageHash
    const  messageHash =  hashMessage(message);
    console.log('messageHash:',messageHash);
    //privateKey 
    console.log('private key:',privateKey)
    //sign
    const signature = await  signMessage(messageHash,privateKey);
    console.log('signature:',signature.toCompactHex());
    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        amount: parseInt(sendAmount),
        recipient,
        messageHash:messageHash,
        signature:signature.toCompactHex()
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
