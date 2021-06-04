// verify name -----------------------------------------------

$("#verifyName").on("click", function () {
  var data = {
    domainName: document.addDomain.name.value,
  };
  console.log(data);
  $("#nameDiv").empty();
  $("#nameDiv").append(`<div font-size: 20px; padding: 2%;">
           Verifying.. Please hold on
         </div>`);

  // Enter regex for domain name and paisa

  var xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      //   console.log("this.responseText :>> ", this.responseText);
      console.log("this.status :>> ", this.status);

      if (this.status >= 200 && this.status < 400) {
        // The request has been completed successfully
        var data = JSON.parse(this.responseText);

        let isReserved = data.isReserved;
        console.log(data.TransactionReceipt);
        sessionStorage.setItem(
          "TxReceipt",
          JSON.stringify(data.TransactionReceipt)
        );
        console.log(sessionStorage.getItem("TxReceipt"));

        if (isReserved == 0) {
          console.log("Verified");
          sessionStorage.setItem("nameVerified", true);
          // sessionStorage.setItem("TxReceipt", data.TransactionReceipt);
          $("#nameDiv").empty();
          $("#nameDiv").append(`<div font-size: 20px; padding: 2%;">
           Verified!                
         </div>`);
        } else {
          alert("Domain name not available");
          $("#nameDiv").empty();
          $("#nameDiv").append(
            `<button type="button" class="btn btn-light" id = "verifyName">verify </button>`
          );
        }
      } else {
        try {
          var data = JSON.parse(this.responseText);
          alert(Object.values(data)[0]);
        } catch (err) {
          console.log(err);
          alert("Error verifying name! Please contact admin.");
          $("#nameDiv").empty();
          $("#nameDiv").append(
            `<button type="button" class="btn btn-light" id = "verifyName">verify </button>`
          );
        }
      }
    }
  });

  xhr.open("POST", "https://ether.jugaldb.com/domain/isReserved/");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("Authorization", sessionStorage.getItem("Token"));

  xhr.send(JSON.stringify(data));
});

// verify amount ---------------------------------------

$("#verifyAmount").on("click", function () {
  var data = {
    domainName: document.addDomain.name.value,
    domainValue: document.addDomain.amount.value,
  };
  console.log(data);
  $("#amountDiv").empty();
  $("#amountDiv").append(`<div font-size: 20px; padding: 2%;">
           Verifying.. Please hold on
         </div>`);

  // Enter regex for domain name and paisa

  var xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      console.log("this.responseText :>> ", this.responseText);
      console.log("this.status :>> ", this.status);

      if (this.status >= 200 && this.status < 400) {
        // The request has been completed successfully
        var data = JSON.parse(this.responseText);

        let reservationTime = data.reservationTime;
        console.log(data.TransactionReceipt);
        sessionStorage.setItem("TxReceipt", data.TransactionReceipt);

        if (reservationTime / 86400 >= 10 && reservationTime / 86400 <= 365) {
          console.log("verified");
          sessionStorage.setItem("timeVerified", true);
          $("#amountDiv").empty();
          $("#amountDiv").append(`<div font-size: 20px; padding: 2%;">
           Verified!
         </div>`);
        } else if (reservationTime / 86400 < 10) {
          alert("Amount too less!");
          $("#amountDiv").empty();
          $("#amountDiv").append(
            `<button type="button" class="btn btn-light" id = "verifyAmount">verify </button>`
          );
        } else {
          alert("Amount too high!");
          $("#amountDiv").empty();
          $("#amountDiv").append(
            `<button type="button" class="btn btn-light" id = "verifyAmount">verify </button>`
          );
        }
      } else {
        try {
          var data = JSON.parse(this.responseText);
          alert(Object.values(data)[0]);
        } catch (err) {
          console.log(err);
          alert("Error verifying amount! Please contact admin.");
          $("#amountDiv").empty();
          $("#amountDiv").append(
            `<button type="button" class="btn btn-light" id = "verifyAmount">verify </button>`
          );
        }
      }
    }
  });

  xhr.open("POST", "https://ether.jugaldb.com/domain/checkTime/");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("Authorization", sessionStorage.getItem("Token"));

  xhr.send(JSON.stringify(data));
});

// register domain  ---------------------------------------------

$("#registerDomain").on("click", function () {
  if (
    sessionStorage.getItem("nameVerified") === null ||
    sessionStorage.getItem("timeVerified") === null
  ) {
    alert("Verify both Domain Name and Domain Value first");
  } else {
    var data = {
      domainName: document.addDomain.name.value,
      domainValue: document.addDomain.amount.value,
    };
    console.log(data);
    $("#finalReg").empty();
    $("#finalReg").append(`<div font-size: 20px; padding: 2%;">
           Registering... Please hold on
         </div>`);

    // Enter regex for domain name and paisa

    var xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log("this.responseText :>> ", this.responseText);
        console.log("this.status :>> ", this.status);

        if (this.status >= 200 && this.status < 400) {
          // The request has been completed successfully
          var data = JSON.parse(this.responseText);

          let reservationTime = data.reservationTime;

          if (data.TransactionReceipt.status == true) {
            console.log("Registered");
            $("#finalReg").empty();

            $("#finalReg").append(
              `Your domain has been registered for ${Math.floor(
                reservationTime / 86400
              )} days successfully!`
            );

            sessionStorage.setItem("TxReceipt", JSON.stringify(data.TransactionReceipt));
            $("#receipt").append(
              `<a href="receipt.html" style="color: white; font-weight: bold; ">CLICK HERE TO VIEW YOUR TRANSACTION RECEIPT</a>`
            );
          } else {
            alert("Error in registering domain! Please try again");
            $("#finalReg").empty();
            $("#finalReg").append(
              `<button type="button" class="btn btn-light" id = 'registerDomain'>REGISTER</button>`
            );
          }
        } else {
          try {
            var data = JSON.parse(this.responseText);
            alert(Object.values(data)[0]);
          } catch (err) {
            console.log(err);
            alert("Error in registering domain! Please try again");
            $("#finalReg").empty();
            $("#finalReg").append(
              `<button type="button" class="btn btn-light" id = 'registerDomain'>REGISTER</button>`
            );
          }
        }
      }
    });

    xhr.open("POST", "https://ether.jugaldb.com/domain/reserve");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", sessionStorage.getItem("Token"));

    xhr.send(JSON.stringify(data));
  }
});
