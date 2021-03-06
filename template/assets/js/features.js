function features(domainName) {
  sessionStorage.setItem("domainName", domainName);
  console.log(sessionStorage.getItem("domainName"));
  window.location.replace("features.html");
}

function dispName() {
  const domainName = sessionStorage.getItem("domainName");
  $("#domName").text(`${domainName}`);
  $("#formAdd")
    .prepend(`<div font-size: 20px; padding: 2%;">Fetching details... 
           
         </div>`);

  const dataDom = {
    domainName: domainName,
  };

  console.log(dataDom);

  var xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      if (this.status >= 200 && this.status < 400) {
        var data = JSON.parse(this.responseText);
        console.log(data.data);
        sessionStorage.setItem(
          "TxReceipt",
          JSON.stringify(data.TransactionReceipt)
        );
        if (data.data.length >= 4) {
          $("#edit").hide();
          $("#formAdd").empty();
          $("#formAdd").prepend(`IP Address = 
           ${data.data}`);
        } else {
          $("#formAdd").empty();
          $("#formAdd").append(`<form name="addDomain" id = 'addDomain'>
              <div class="form-group row">
                <label for="text" class="col-4 col-form-label">Set Domain Address</label>
                <div class="col-lg-4">
                  <div class="input-group" id='simple'>
                    <input id="domAdd" name="domAdd" placeholder="Enter the IP here" type="text" required="required"
                      class="form-control">

                  </div>
                </div>

                <div class="col-lg-1" id='amountDiv'>
                  <button style=" font-weight: 700; box-shadow: 2px 2px 10px 1px rgb(173, 165, 165); " type="button"
                    class="btn btn-light" id="setdomain" onClick = 'setDomain()'>SET</button>
                </div>
              </div>

              <div class="form-group row" id='custom'>
                <label for="sdate" class="col-4 col-form-label">Set Custom Domain Name</label>
                <div class="col-lg-4">
                  <input id="sdate" name="name" placeholder="If available enter the domain name" type="text"
                    class="form-control" required="required">
                </div>
                <div class="col-lg-1" id='amountDiv'>
                  <button style=" font-weight: 700; box-shadow: 2px 2px 10px 1px rgb(173, 165, 165); " type="button"
                    class="btn btn-light" id="verifyAmount" onClick = 'setCustomDomain()'>SET</button>
                </div>
                <div class="col-lg-1" id="nameDiv">
                  <button style=" font-weight: 700;" type="button" class="btn btn-light" id="verifyName" onClick = 'verifyMine()'>VERIFY</button>
                </div>
              </div>
            </form>`);
        }
      }
      if (this.status >= 500) {
        alert("You have pending transactions");
        window.location.reload();
      }

      console.log(this.responseText);
    }
  });

  xhr.open("POST", "https://ether.jugaldb.com/domain/get");
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.setRequestHeader("Authorization", sessionStorage.getItem("Token"));
  xhr.send(JSON.stringify(dataDom));
}

function setDomain(){
  let domainAddress = document.getElementById("domAdd").value;
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

        console.log("data :>> ", data);
        console.log(data.TransactionReceipt);
        sessionStorage.setItem("TxReceipt", data.TransactionReceipt);

        var set = data.set;
        sessionStorage.setItem(
          "TxReceipt",
          JSON.stringify(data.TransactionReceipt)
        );
        if (set == 1) {
          $("#formAdd").empty();
          $("#formAdd").append(`<div font-size: 20px; padding: 2%;">
           ${domainAddress}
         </div>`);
        } else {
          alert("Error in setting domain address! Try again");
          window.location.reload();
        }
      } else {
        try {
          var data = JSON.parse(this.responseText);
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
}

//set custom domain
function verifyMine() {
  var data = {
    domainName: document.getElementById("sdate").value,
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

        if (isReserved == 1) {
          console.log("Verified");
          sessionStorage.setItem("nameVerified", true);
          // sessionStorage.setItem("TxReceipt", data.TransactionReceipt);
          $("#nameDiv").empty();
          $("#nameDiv").append(`<div font-size: 20px; padding: 2%;">
           Verified!                
         </div>`);
        } else {
          alert("Domain name not reserved by you!");
          $("#nameDiv").empty();
          $("#nameDiv").append(
            `<button type="button" class="btn btn-light" id = "verifyName">verify </button>`
          );
        }
      } else {
        try {
          var data = JSON.parse(this.responseText);
        } catch (err) {
          console.log(err);
          alert("Error verifying name! Please contact admin.");
          $("#nameDiv").empty();
          $("#nameDiv").append(
            `<button type="button" class="btn btn-light" id = "verifyName">verify</button>`
          );
        }
      }
    }
  });

  xhr.open("POST", "https://ether.jugaldb.com/domain/isReserved/");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("Authorization", sessionStorage.getItem("Token"));

  xhr.send(JSON.stringify(data));
}

// set custom
function setCustomDomain() {
  if (sessionStorage.getItem("nameVerified") === null) {
    alert("Verify both Domain Name and Domain Value first");
  } else {

    let domainAddress = document.getElementById("domAdd").value;
    var data = {
      domainName: sessionStorage.getItem("domainName"),
      domainAlias: document.getElementById("sdate").value,
    };

    console.log(data);

    var xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        if (this.status >= 200 && this.status < 400) {
          // The request has been completed successfully
          var data = JSON.parse(this.responseText);

          console.log("data :>> ", data);
          console.log(data.TransactionReceipt);

          var set = data.set;
          sessionStorage.setItem(
            "TxReceipt",
            JSON.stringify(data.TransactionReceipt)
          );
          if (set == 1) {
            $("#formAdd").empty();
            $("#formAdd").append(`<div font-size: 20px; padding: 2%;">
           ${domainAddress}
         </div>`);
            window.location.reload();
          } else {
            alert("Error in setting domain address! Try again");
            window.location.reload();
          }
        } else {
          try {
            var data = JSON.parse(this.responseText);
          } catch (err) {
            console.log(err);

            alert("Error in setting domain address! Contact admin");
            window.location.reload();
          }
        }
      }
    });

    xhr.open("POST", "https://ether.jugaldb.com/domain/setCustom");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", sessionStorage.getItem("Token"));

    xhr.send(JSON.stringify(data));
  }
}

// verify amount ----------------------------------------------------------------

$("#verifyAmount").on("click", function () {
  sessionStorage.setItem("isValueVerified", 0);
  var data = {
    domainName: sessionStorage.getItem("domainName"),
    domainValue: $("#amount").val(),
  };
  console.log(data);
  $("#amtDiv").empty();
  $("#amtDiv").append(`<div font-size: 20px; padding: 2%;">
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
        sessionStorage.setItem("isValueVerified", 1);
        let reservationTime = data.reservationTime;
        console.log(data.TransactionReceipt);
        sessionStorage.setItem(
          "TxReceipt",
          JSON.stringify(data.TransactionReceipt)
        );

        if (reservationTime / 86400 >= 10 && reservationTime / 86400 <= 365) {
          console.log("verified");
          sessionStorage.setItem("timeVerified", true);
          $("#amtDiv").empty();
          $("#amtDiv").append(`<div font-size: 20px; padding: 2%;">
           Verified!
         </div>`);
        } else {
          $("#amtDiv")
            .empty()
            .append(
              `<button type="button" class="btn btn-light" id = "verifyAmount">verify </button>`
            );
          if (reservationTime / 86400 < 10) alert("Amount too less!");
          else alert("Amount too high!");
        }
      } else {
        try {
          var data = JSON.parse(this.responseText);
        } catch (err) {
          console.log(err);
          alert("Error verifying amount! Please contact admin.");

          $("#amtDiv")
            .empty()
            .append(
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
  if (sessionStorage.getItem("isValueVerified") == 0) {
    alert("Verify Value first");
  } else {
    var data = {
      domainName: sessionStorage.getItem("domainName"),
      value: $("#amount").val(),
    };

    console.log(data);

    $("#extDiv").empty().append(`<div font-size: 20px; padding: 2%;">
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
          sessionStorage.setItem(
            "TxReceipt",
            JSON.stringify(data.TransactionReceipt)
          );

          if (data.TransactionReceipt.status == true) {
            console.log("extended");
            $("#extDiv").empty();

            $("#extDiv").append(
              `Your domain has been extended for ${Math.floor(
                reservationTime / 86400
              )} days successfully!`
            );

            sessionStorage.setItem(
              "TxReceipt",
              JSON.stringify(data.TransactionReceipt)
            );
            $("#receipt").append(
              `<a href="receipt.html" style="color: white; font-weight: bold; ">CLICK HERE TO VIEW YOUR TRANSACTION RECEIPT</a>`
            );
          } else {
            alert("Error in extending domain! Please try again");
            $("#extDiv").empty();
            $("#extDiv").append(
              `<button type="button" class="btn btn-light" id = 'extendDomain'>extend</button>`
            );
          }
        } else {
          try {
            var data = JSON.parse(this.responseText);
          } catch (err) {
            console.log(err);
            alert("Error in extending domain! Please try again");
            $("#extDiv").empty();
            $("#extDiv").append(
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
    domainName: sessionStorage.getItem("domainName"),
  });

  var xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      if (this.status >= 200 && this.status < 400) {
        // The request has been completed successfully
        var data = JSON.parse(this.responseText);
        console.log("this.responseText :>> ", this.responseText);
        sessionStorage.setItem("isDomainDeleted", 1);
        sessionStorage.setItem(
          "TxReceipt",
          JSON.stringify(data.TransactionReceipt)
        );
        $("#delDomAdd").attr("disabled", "").empty().append("Domain deleted.");
      } else {
        var data = JSON.parse(this.responseText);
        console.log("this.responseText :>> ", this.responseText);
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
  var data = "";
  if (sessionStorage.getItem("isDomainDeleted")) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        if (this.status >= 200 && this.status < 400) {
          // The request has been completed successfully
          var data = JSON.parse(this.responseText);
          sessionStorage.setItem(
            "TxReceipt",
            JSON.stringify(data.TransactionReceipt)
          );
          console.log("this.responseText :>> ", this.responseText);
          window.open("dashboard.html", "_self");
          $("#pullDeposit").attr("disabled", "").empty().append("Pulled.");
        } else {
          var data = JSON.parse(this.responseText);
          console.log("this.responseText :>> ", this.responseText);
        }
      }
    });

    xhr.open("POST", "https://ether.jugaldb.com/domain/pull/");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", sessionStorage.getItem("Token"));

    xhr.send(data);
  } else {
    alert("Please delete the domain name first!");
  }
});
