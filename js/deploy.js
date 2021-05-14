require("dotenv").config({ path: "../.env" });

const Tx = require('ethereumjs-tx').Transaction
const Web3 = require("web3");
const web3 = new Web3(process.env.TESTNET_URL);
const secretKey1 = Buffer.from(process.env.SECRET_KEY.substring(2, 66), "hex");
const account1 = "0x71D9641D53B0020C3f1dd0776C6E978c247DaD86";

const contractAddress = process.env.CONTRACT_ADDRESS;

web3.eth.getTransactionCount(account1, (err, txCount) => {

    //Smart contract data
    const data = require('./data.js').data;
    console.log(txCount)
    //Create Transaction Object
    const txObject = {
      from: account1,
      to: contractAddress,
      nonce: web3.utils.toHex(txCount),
      gasLimit: web3.utils.toHex(1000000),
      gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
      data: data,
    };
    
    //Sign the transaction
    const tx = new Tx(txObject, {chain: 'ropsten'});
    tx.sign(secretKey1);

    const serializedTx = tx.serialize()
    const raw = '0x' + serializedTx.toString('hex')

    //Broadcast the transaction
    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
        console.log('err:', err , "txHash:", txHash)
    })
})



