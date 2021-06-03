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

const contractMethod = contract.methods.findDomain("abcde.com");
web3.eth.getTransactionCount(acAddress, async(err, txCount) => {
  //Create the transaction object
  const txObject = {
    from: acAddress,
    to: contractAddress,
    nonce: web3.utils.toHex(txCount),
    gasLimit: web3.utils.toHex(6000000),
    gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
    data: contractMethod.encodeABI(),
  };

  //Sign the transaction
  const tx = new Tx(txObject, { chain: "ropsten" });
  tx.sign(secretKey);

  const serializedTx = tx.serialize();
  const raw = "0x" + serializedTx.toString("hex");

  //Broadcast the transaction

  await web3.eth
    .sendSignedTransaction(raw)
    .then(async (txHash) => {
    //   console.log(txHash);
        console.log("TxHash:", txHash.transactionHash);
        console.log(txHash.logs[0].topics);
        console.log(typeof txHash.logs[0].data);

        const log = web3.eth.abi.decodeLog(
          [
            {
              name: "domainName",
              type: "string",
            },
            {
              name: "reservationEndTime",
              type: "uint256",
            },
            {
              name: "owner",
              type: "address",
            },
            {
              name: "deposit",
              type: "uint256",
            },
            {
              name: "addressType",
              type: "uint8",
            },
            {
              name: "domainAddress",
              type: "string",
            },
            {
              name: "domainAlias",
              type: "string",
            },
          ],
          txHash.logs[0].data,
          txHash.logs[0].topics
        );
        console.log(log);
        // let reservationTime = web3.utils.hexToAscii(txHash.logs[0].data);
        // let reservationTime = Buffer.from(
        //   txHash.logs[0].data.substring(2, 66),
        //   "hex"
        // );
        console.log(txHash.logs[0].data.length);
        // console.log(reservationTime);

        // let len = 64;
        // let offset = 2;
        // let arr = [];
        // let str = txHash.logs[0].data;
        // let size = Math.ceil(str.length/len)


        // for (let i = 0; i < size; i++) {
        //   arr[i] = str.substr(offset, len);
        //   offset += len;
        // }

        // console.log(arr);



    })
    .catch((err) => console.log(err));
});
