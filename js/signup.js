require("dotenv").config();

const Web3 = require("web3");
const web3 = new Web3(process.env.TESTNET_URL);

function createAccount(){
    let newAccount = web3.eth.accounts.create();
    let address = newAccount.address;
    let privateKey = newAccount.privateKey;
    console.log("Address", address);
    console.log("Private Key", privateKey);
}


