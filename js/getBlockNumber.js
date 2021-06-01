require("dotenv").config({ path: "../.env" });

const Web3 = require("web3");
const web3 = new Web3(process.env.TESTNET_URL);

const contractAddress = process.env.CONTRACT_ADDRESS;
const contractABI = require("./ABI.js").data;

const contract = new web3.eth.Contract(contractABI, contractAddress);

console.log(contract.defaultBlock);
