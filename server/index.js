const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "03170c8e65ea4bd9ef2640b4ca9422a896b3cb8fc6504b8781b6184e93605a54d2": 100, //c44d4b08ad5e6b92fb090256f2454c99ef1c8a7a0e7ab18da84b7e67a0af2476
  "03450455f29a719adf049aa0a932efae99f9fc54e1fb3535e44c517760e07046d8": 50,  //313a34fcf6a94c8ef6f1058037dd82589d50d4a3c5550e8e1d2f6aa372eda1a7
  "0257e7ffd01099ab016b7544bc2b5005ab70977be6e5301e4387f4abb54fad7409": 75,   //657be0ca96b0c7d7a4df8653e083c60cf7e4c674213c1a8db5334ac9efeede2c
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  console.log('address:',address);
  const balance = balances[address] || 0;
  console.log('balance:',balance);
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
