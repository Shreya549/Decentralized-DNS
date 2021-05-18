require("dotenv").config({ path: "../.env" });

const Web3 = require("web3");
const web3 = new Web3(process.env.TESTNET_URL);

let balance = web3.eth.getBalance("0x7AD87A1D2fbc9a9feD613C66Ea04452275E9D2fA").then(console.log);
console.log(balance);

exports.balance = balance;

