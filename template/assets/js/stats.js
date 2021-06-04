function stats() {
  var xhr = new XMLHttpRequest();
  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      //   console.log("this.responseText :>> ", this.responseText);
      console.log("this.status :>> ", this.status);

      if (this.status >= 200 && this.status < 400) {
        // The request has been completed successfully
        var data = JSON.parse(this.responseText);

        $("#stats")
          .append(`
          <table class="table table-bordered" style="text-align: left ;color:white; border: 4px solid white; border-radius: 50px;">
          <thead>
          <tr style="font-weight-900; font-size: 20px "class="table-light">
          <th  scope="col">Total No of Accounts in BlockChain</th>
          <th  scope="col" id="blockHash"></th>
          </tr>
          </thead>
          </table>
          
          <table class="table table-bordered" style="text-align: left ;color:white; border: 4px solid white; border-radius: 50px;">
        <thead>
        <tr style="font-weight-900; font-size: 20px "class="table-light">
            <th  scope="col">Total Domains on Network</th>
            <th  scope="col" id="blockHash">${data.totalDomains}</th>
          </tr>
          <tr >
            <th  scope="col">Smart Contract Address</th>
            <th  scope="col" id="blockHash"><a style="color: white" href="https://ropsten.etherscan.io/address/${data.contractAddress}" target = "_blank">${data.contractAddress}</a></th>
          </tr>
        </thead>
        <tbody>
          <tr >
            <th  scope="row">Hard Fork</th>
            <th id="blockNumber">${data.hardFork}</th>
          </tr>
          <tr >
            <th scope="row">Chain</th>
            <th id="contractAd">${data.chain}</th>
          </tr>
          <tr >
            <th scope="row">Number of Block Confirmations</th>
            <th id="cumGas">${data.txConfBlock}</th>
          </tr>
          <tr>
            <th scope="row">Average Gas</th>
            <th id="from">${data.avgGas}</th>
          </tr>
          <tr>
            <th scope="row">Initial Block</th>
            <th id="to"><a style="color: white" href="https://ropsten.etherscan.io/block/${data.initBlock}" target = "_blank">${data.initBlock}</a></th>
          </tr>
          <tr>
            <th scope="row">Current Block</th>
            <th id="gas"><a style="color: white" href="https://ropsten.etherscan.io/block/${data.currBlock}" target = "_blank">${data.currBlock}</a></th>
          </tr>
          <tr>
            <th scope="row">Node Information</th>
            <th id="data">${data.nodeInfo}</th>
          </tr>
          <tr>
            <th scope="row">Transaction Count </th>
            <th id="txhash">${data.txList.result.length}</th>
          </tr>
          
        </tbody>
      </table>`);

        var result = data.txList.result;

        for (let i = 0; i < result.length; i++) {
          $("#tx")
            .append(`<table class="table table-bordered" style="text-align: left ;color:white; border: 4px solid white; border-radius: 50px;">
        <thead>
          <tr>
            <th scope="col">Block Number</th>
            <th scope="col" id="blockHash"><a style="color: white" href="https://ropsten.etherscan.io/block/${result[i].blockNumber}" target = "_blank">${result[i].blockNumber}</a></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">TimeStamp</th>
            <th id="blockNumber">${result[i].timeStamp}</th>
          </tr>
          <tr>
            <th scope="row">Transaction Hash</th>
            <th id="contractAd"> <a style="color: white" href="https://ropsten.etherscan.io/tx/${result[i].hash}" target = "_blank">${result[i].hash}</a></th>
          </tr>
          <tr>
            <th scope="row">From Address</th>
            <th id="cumGas"><a style="color: white" href="https://ropsten.etherscan.io/address/${result[i].from}" target = "_blank">${result[i].from}</a></th>
          </tr>
          <tr>
            <th scope="row">To Address</th>
            <th id="from"><a style="color: white" href="https://ropsten.etherscan.io/tx/${result[i].to}" target = "_blank">${result[i].to}</a></th>
          </tr>
          <tr>
            <th scope="row">Gas</th>
            <th id="to">${result[i].gas}</th>
          </tr>
          <tr>
            <th scope="row">Gas Price</th>
            <th id="gas">${result[i].gasPrice}</th>
          </tr>
          <tr>
            <th scope="row">Cumulative Gas Used</th>
            <th id="data">${result[i].cumulativeGasUsed}</th>
          </tr>
          <tr>
            <th scope="row">Confirmations </th>
            <th id="txhash">${result[i].confirmations}</th>
          </tr>
        </tbody>
      </table>`);
        }
      } else {
        try {
          var data = JSON.parse(this.responseText);
          alert(Object.values(data)[0][0]);
        } catch (err) {
          console.log(err);
          alert("Error getting network details! Please contact admin.");
        }
      }
    }
  });
  xhr.open("GET", "https://ether.jugaldb.com/network/details/");
  xhr.send();
}
