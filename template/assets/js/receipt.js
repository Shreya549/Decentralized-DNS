function getReceipt() {
  if (sessionStorage.getItem("TxReceipt") === null) {
    alert("No transaction found to show receipt!");
    window.location.replace("dashboard.html");
  } else {
    var tx = JSON.parse(sessionStorage.getItem("TxReceipt"));
    $("#receiptHeader").append(
      `<a style="color: white" href="https://ropsten.etherscan.io/tx/${tx.transactionHash}" target = "_blank"> Verify Transaction on EtherScan</a>`
    );

    $("#blockHash").append(tx.blockHash);
    $("#blockNumber").append(tx.blockNumber);
    $("#contractAd").append(tx.logs[tx.logs.length - 1].address);
    $("#cumGas").append(tx.cumulativeGasUsed);
    $("#from").append(tx.from);
    $("#to").append(tx.to);
    $("#gas").append(tx.gasUsed);
    $("#data").append(tx.logs[tx.logs.length - 1].data);
    $("#txhash").append(tx.transactionHash);
    $("#status").append(tx.status);
  }
}
