Date.prototype.addHours = function (h) {
  this.setTime(this.getTime() + h * 60 * 60 * 1000);
  return this;
};

// User Signup
// -----------------------------------------------------------

$("#stuSignupBtn").on("click", function () {
  var data = {
    name: document.studentSignup.name.value,
    email: document.studentSignup.email.value,
    password: document.studentSignup.pass.value,
  };
  console.log(data);

  let error = "";
  let name = /^[a-zA-Z ]*$/;
  let uid = /^[0-9]{2}[A-Z]{3}[0-9]{4}$/;
  let password = /^.{8,}$/;
  let flag = 0;
  if (!name.test(data["name"])) {
    error += ">> Enter only Alphabets in name!\n";
    flag = 1;
  }
  if (!password.test(data["password"])) {
    error += ">> Please enter correct password!\n";
    flag = 1;
  }
  if (flag) {
    return alert(error);
  }

  var xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      console.log("this.responseText :>> ", this.responseText);
      console.log("this.status :>> ", this.status);

      if (this.status >= 200 && this.status < 400) {
        // The request has been completed successfully
        var data = JSON.parse(this.responseText);

        sessionStorage.setItem("Token", "Bearer " + data.token);
        sessionStorage.setItem("name", data.userDetails.name);
        sessionStorage.setItem("email", data.userDetails.email);
        sessionStorage.setItem(
          "accountAddress",
          data.userDetails.accountAddress
        );

        //The user has successfully authenticated.
        sessionStorage.setItem("AuthenticationState", "Authenticated");

        //This authentication key will expire in 1 hour.
        sessionStorage.setItem("AuthenticationExpires", new Date().addHours(1));

        window.location.replace("dashboard.html");
      } else {
        try {
          var data = JSON.parse(this.responseText);
          alert(Object.values(data)[0]);
        } catch (err) {
          alert("Error signing up! Please contact admin.");
        }
      }
    }
  });

  xhr.open("POST", "https://ether.jugaldb.com/auth/signup/");
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.send(JSON.stringify(data));
});

// Student Signin
// -----------------------------------------------------------

$("#stuSigninBtn").on("click", function () {
  var data = {
    email: document.studentSignin.email.value,
    password: document.studentSignin.pass.value,
  };
  console.log(data);

  let error = "";
  let password = /^.{8,}$/;
  let flag = 0;

  if (!password.test(data["password"])) {
    error += ">> Please enter correct password!\n";
    flag = 1;
  }
  if (flag) {
    return alert(error);
  }

  var xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      console.log("this.responseText :>> ", this.responseText);
      console.log("this.status :>> ", this.status);

      if (this.status >= 200 && this.status < 400) {
        // The request has been completed successfully
        var data = JSON.parse(this.responseText);
        sessionStorage.setItem("Token", "Bearer " + data.token);
        sessionStorage.setItem("name", data.userDetails.name);
        sessionStorage.setItem("email", data.userDetails.email);
        sessionStorage.setItem(
          "accountAddress",
          data.userDetails.accountAddress
        );

        //The user has successfully authenticated.
        sessionStorage.setItem("AuthenticationState", "Authenticated");

        //This authentication key will expire in 1 hour.
        sessionStorage.setItem("AuthenticationExpires", new Date().addHours(1));

        window.location.replace("dashboard.html");
      } else {
        try {
          var data = JSON.parse(this.responseText);
          alert(Object.values(data)[0]);
        } catch (err) {
          alert("Error signing in! Please contact admin.");
        }
      }
    }
  });

  xhr.open("POST", "https://ether.jugaldb.com/auth/login/");
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.send(JSON.stringify(data));
});
