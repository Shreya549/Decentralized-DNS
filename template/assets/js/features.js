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