require("dotenv").config({ path: "../.env" });

const Web3 = require("web3");
const web3 = new Web3(process.env.TESTNET_URL);
const Tx = require("ethereumjs-tx").Transaction;

const contractAddress = process.env.CONTRACT_ADDRESS;
const contractABI = require("./ABI.js").data;

const contract = new web3.eth.Contract(contractABI, contractAddress);

let acAddress = "0x2b135743063e963CFDE6c4A701d20D4054E0baB9";
let secretKey = Buffer.from(
  "0xd64e84b419cfc87dd15434ad195908a7ce881c4c33641b8a8f9efb01d4fff9c7".substring(
    2,
    66
  ),
  "hex"
);

web3.eth.getTransactionCount(acAddress, (err, txCount) => {
  //Create the transaction object
  const txObject = {
    from: acAddress,
    to: contractAddress,
    nonce: web3.utils.toHex(txCount),
    value: web3.utils.toHex("10000000"),
    gasLimit: web3.utils.toHex(6000000),
    gasPrice: web3.utils.toHex(web3.utils.toWei("100", "gwei")),
    data: contract.methods.extendDomainNameReservation("mitra.com").encodeABI(),
  };

  // console.log(txObject)

  //Sign the transaction
  const tx = new Tx(txObject, { chain: "ropsten" });
  tx.sign(secretKey);

  const serializedTx = tx.serialize();
  const raw = "0x" + serializedTx.toString("hex");

  //Broadcast the transaction
  web3.eth
    .sendSignedTransaction(raw)
    .then(async (txHash) => {
      console.log("TxHash:", txHash.transactionHash);
      console.log(txHash);

      let reservationTime = web3.utils.hexToNumber(
        txHash.logs[txHash.logs.length - 1].data
      );
      console.log(reservationTime);
    })
    .catch((err) => console.log(err.toString()));
});
