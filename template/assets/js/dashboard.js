function dashboard() {
  var xhr = new XMLHttpRequest();
  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      console.log("this.responseText :>> ", this.responseText);
      console.log("this.status :>> ", this.status);

      if (this.status >= 200 && this.status < 400) {
        // The request has been completed successfully

        var data = JSON.parse(this.responseText);
        var eth = parseFloat(data.balance / 1000000000000000000).toFixed(2);
        var { domainNames, numOfDomains } = data;

          $("#registerDomain").text(`${data.balance} wei ~ ${eth} ether`);
          $("#regDomHead").text(`Registered Domains = ${numOfDomains}`);

        for (let i = 0; i < numOfDomains; i++) {
          $("#domNames").append(`<tr>
            <th class="align-middle" scope="col">${domainNames[i]}</th>
            <th scope="col" id="blockHash" style="text-align: right;">  <button type="button" style="font-weight: 900; " class="btn btn-light btn-" id = 'registerDomain'>Change the features</button></th>
          </tr>`);
        }

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
  xhr.open("GET", "https://ether.jugaldb.com/auth/me");
  xhr.setRequestHeader("Authorization", sessionStorage.getItem("Token"));
  xhr.send();
}
