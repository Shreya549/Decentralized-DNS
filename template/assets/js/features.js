function features(domainName) {
  sessionStorage.setItem("domainName", domainName);
  console.log(sessionStorage.getItem("domainName"));
  window.location.replace("features.html");
}

function dispName() {
  const domainName = sessionStorage.getItem("domainName");
  $("#domName").text(`${domainName}`);
}

$("#setdomain").click(function () {
  var data = {
    domainName: sessionStorage.getItem("domainName"),
    domainAddress: document.getElementById("domAdd").value,
  };

  console.log(data);

  var xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      if (this.status >= 200 && this.status < 400) {
        // The request has been completed successfully
        var data = JSON.parse(this.responseText);

        console.log('data :>> ', data);
        console.log(data.TransactionReceipt);
        sessionStorage.setItem("TxReceipt", data.TransactionReceipt);

        var set = data.set;
        if (set == 1) {
          $("#custom").hide();
          $("#simple").empty();
          console.log(data);
          $("#simple").append(`<div font-size: 20px; padding: 2%;">
           ${data.domainAddress}
         </div>`);
        } else {
          alert("Error in setting domain address! Try again");
          window.location.reload();
        }
      } else {
        try {
          var data = JSON.parse(this.responseText);
          alert(Object.values(data)[0]);
        } catch (err) {
          console.log(err);

          alert("Error in setting domain address! Contact admin");
          window.location.reload();
        }
      }
    }
  });

  xhr.open("POST", "https://ether.jugaldb.com/domain/set");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("Authorization", sessionStorage.getItem("Token"));

  xhr.send(JSON.stringify(data));
});

// verify amount ----------------------------------------------------------------

$("#verifyAmount").on("click", function () {
  sessionStorage.setItem("isValueVerified", 0);
  var data = {
    domainName: document.addDomain.name.value,
    domainValue: document.addDomain.amount.value,
  };
  console.log(data);
  $("#amountDiv").empty();
  $("#amountDiv").append(`<div font-size: 20px; padding: 2%;">
           Verifying.. Please hold on
         </div>`);

  // Enter regex for domain name and price

  var xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      console.log("this.responseText :>> ", this.responseText);
      console.log("this.status :>> ", this.status);

      if (this.status >= 200 && this.status < 400) {
        // The request has been completed successfully
        var data = JSON.parse(this.responseText);
        sessionStorage.setItem("isValueVerified", 1)
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

// extend ----------------------------------------------------------------
$("#extendDomain").on("click", function () {
  if (
    sessionStorage.getItem("isValueVerified") == 0
  ) {
    alert("Verify Value first");
  } else {
    var data = {
      domainName: document.addDomain.name.value,
      domainValue: document.addDomain.amount.value,
    };

    console.log(data);

    $("#finalReg").empty().append(`<div font-size: 20px; padding: 2%;">
           extending... Please hold on
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
            console.log("extended");
            $("#finalReg").empty();

            $("#finalReg").append(
              `Your domain has been extended for ${Math.floor(
                reservationTime / 86400
              )} days successfully!`
            );

            sessionStorage.setItem("TxReceipt", JSON.stringify(data.TransactionReceipt));
            $("#receipt").append(
              `<a href="receipt.html" style="color: white; font-weight: bold; ">CLICK HERE TO VIEW YOUR TRANSACTION RECEIPT</a>`
            );
          } else {
            alert("Error in extending domain! Please try again");
            $("#finalReg").empty();
            $("#finalReg").append(
              `<button type="button" class="btn btn-light" id = 'extendDomain'>extend</button>`
            );
          }
        } else {
          try {
            var data = JSON.parse(this.responseText);
            alert(Object.values(data)[0]);
          } catch (err) {
            console.log(err);
            alert("Error in extending domain! Please try again");
            $("#finalReg").empty();
            $("#finalReg").append(
              `<button type="button" class="btn btn-light" id = 'extendDomain'>extend</button>`
            );
          }
        }
      }
    });

    xhr.open("POST", "https://ether.jugaldb.com/domain/extend");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", sessionStorage.getItem("Token"));

    xhr.send(JSON.stringify(data));
  }
});

// delete domain address -------------------------------------------------------

$("#delDomAdd").click(function () {
  var data = JSON.stringify({
    "domainName": sessionStorage.getItem("domainName")
  });

  var xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      if (this.status >= 200 && this.status < 400) {
        // The request has been completed successfully
        var data = JSON.parse(this.responseText);
        console.log('this.responseText :>> ', this.responseText);
        sessionStorage.setItem("isDomainDeleted", 1);
        $("#delDomAdd").attr('disabled', '').empty().append("Domain deleted.")
      } else {
        var data = JSON.parse(this.responseText);
        console.log('this.responseText :>> ', this.responseText);
        alert(Object.values(data)[0]);
      }
    }
  });

  xhr.open("POST", "https://ether.jugaldb.com/domain/release/");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("Authorization", sessionStorage.getItem("Token"));

  xhr.send(data);
});

// pull deposit --------------------------------------------------------------

$("#pullDeposit").click(function () {
  c
  var data = "";
  if (sessionStorage.getItem("isDomainDeleted")) {

    var xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        if (this.status >= 200 && this.status < 400) {
          // The request has been completed successfully
          var data = JSON.parse(this.responseText);
          console.log('this.responseText :>> ', this.responseText);
          window.open("dashboard.html", "_self");
          $("#pullDeposit").attr('disabled', '').empty().append("Pulled.")
        } else {
          var data = JSON.parse(this.responseText);
          console.log('this.responseText :>> ', this.responseText);
          alert(Object.values(data)[0]);
        }
      }
    });

    xhr.open("POST", "https://ether.jugaldb.com/domain/pull/");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", sessionStorage.getItem("Token"));

    xhr.send(data);
  }
  else {
    alert("Please delete the domain name first!")
  }
});
