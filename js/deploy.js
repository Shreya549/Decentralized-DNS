require("dotenv").config({ path: "../.env" });

const Tx = require('ethereumjs-tx').Transaction
const Web3 = require("web3");
const web3 = new Web3(process.env.TESTNET_URL);
const secretKey1 = Buffer.from(process.env.SECRET_KEY.substring(2, 66), "hex");
const account1 = "0x2b135743063e963CFDE6c4A701d20D4054E0baB9"; //deployed account

const contractAddress = process.env.CONTRACT_ADDRESS;

web3.eth.getTransactionCount(account1, (err, txCount) => {

    //Smart contract data
    const data = require('./data.js').data;
    
    //Create Transaction Object
    const txObject = {
      from: account1,
      //   to: contractAddress,
      nonce: web3.utils.toHex(txCount),
      gasLimit: web3.utils.toHex(6000000),
      gasPrice: web3.utils.toHex(web3.utils.toWei("100", "gwei")),
      data: data,
    };
    
    //Sign the transaction
    const tx = new Tx(txObject, {chain: 'ropsten'});
    tx.sign(secretKey1);

    const serializedTx = tx.serialize()
    const raw = '0x' + serializedTx.toString('hex')

    //Broadcast the transaction
    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
        console.log('err:', err, "txHash:", txHash)
        web3.eth.getTransactionReceipt(txHash, (error, receipt) => {
          console.log("err:", error);
          console.log("Receipt:", receipt);
        });
    })
})



