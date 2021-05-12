var Web3 = require('web3')
var web3 = new Web3("http://127.0.0.1:7545");
web3.eth.getBalance('0xd51D1ee2b765Aae0085a98857fC8B1ad0BAaD815')

async function func(){
    var balance1 = await web3.eth.getBalance(
      "0x93b8901561662BEB388F770a57Ff04d302eE2fb4");
    console.log(balance1);
};

var contract = new web3.eth.Contract(
  abi,
  "0x6d4d53f225a41e797b235d7c96c62183362b5b3f"
);