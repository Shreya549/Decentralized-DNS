Date.prototype.addHours = function (h) {
    this.setTime(this.getTime() + (h * 60 * 60 * 1000));
    return this;
}

// Faculty Signup
// -----------------------------------------------------------
$("#facSignupBtn").on("click", function () {
    var data = {
        "name": document.facultySignup.name.value,
        "uid": document.facultySignup.uid.value,
        "email": document.facultySignup.email.value,
        "password": document.facultySignup.pass.value
    };
    console.log(data);
    let error = "";
    let name = /^[a-zA-Z ]+$/;
    let uid = /^[0-9]{5}$/;
    let password = /^.{8,}$/;
    let flag = 0
    if (!name.test(data['name'])) {
        error += ">> Enter only Alphabets in name!\n";
        flag = 1;
    }
    if (!uid.test(data['uid'])) {
        error += ">> Enter 5 digits in Faculty ID!\n";
        flag = 1;
    }
    if (!password.test(data['password'])) {
        error += ">> Please enter correct password!\n";
        flag = 1;
    }
    if (flag) {
        return alert(error);
    }

    var xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log('this.responseText :>> ', this.responseText);
            console.log('this.status :>> ', this.status);

            if (this.status >= 200 && this.status < 400) {
                // The request has been completed successfully
                var data = JSON.parse(this.responseText)

                sessionStorage.setItem("Token", "Token " + data.token)
                sessionStorage.setItem("ac_type", data.ac_type)
                sessionStorage.setItem("name", data.name)
                sessionStorage.setItem("email", data.email)
                sessionStorage.setItem("uid", data.uid)

                //The user has successfully authenticated.
                sessionStorage.setItem("AuthenticationState", "Authenticated");

                //This authentication key will expire in 1 hour.
                sessionStorage.setItem("AuthenticationExpires", new Date().addHours(1));

                window.location.replace('dashboardf.html')
            } else {
                try {
                    var data = JSON.parse(this.responseText);
                    alert(Object.values(data)[0][0]);
                }
                catch (err) {
                    alert("Error signing up! Please contact admin.");
                }
            }
        }
    });

    xhr.open("POST", "https://projenarator.herokuapp.com/register-faculty/");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(JSON.stringify(data));


});

// Faculty Signin
// -----------------------------------------------------------
$("#facSigninBtn").on("click", function () {
    var data = {
        "uid": document.facultySignin.uid.value,
        "password": document.facultySignin.pass.value
    };
    console.log(data);

    let error = "";
    let uid = /^[0-9]{5}$/;
    let password = /^.{8,}$/;
    let flag = 0

    if (!uid.test(data['uid'])) {
        error += ">> Enter 5 digits in Faculty ID!\n";
        flag = 1;
    }
    if (!password.test(data['password'])) {
        error += ">> Please enter correct password!\n";
        flag = 1;
    }
    if (flag) {
        return alert(error);
    }

    var xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log('this.responseText :>> ', this.responseText);
            console.log('this.status :>> ', this.status);

            if (this.status >= 200 && this.status < 400) {
                // The request has been completed successfully
                var data = JSON.parse(this.responseText)
                if (data.ac_type == "Faculty") {
                    sessionStorage.setItem("ac_type", data.ac_type)
                    sessionStorage.setItem("Token", "Token " + data.token)
                    sessionStorage.setItem("name", data.name)
                    sessionStorage.setItem("email", data.email)
                    sessionStorage.setItem("uid", data.uid)

                    //The user has successfully authenticated.
                    sessionStorage.setItem("AuthenticationState", "Authenticated");

                    //This authentication key will expire in 1 hour.
                    sessionStorage.setItem("AuthenticationExpires", new Date().addHours(1));

                    window.location.replace('dashboardf.html')
                }
                else {
                    alert("The account does not belong to Faculty! Try student login.")
                }
            } else {
                try {
                    var data = JSON.parse(this.responseText);
                    alert(Object.values(data)[0][0]);
                }
                catch (err) {
                    alert("Error signing in! Please contact admin.");
                }
            }
        }
    });

    xhr.open("POST", "https://projenarator.herokuapp.com/login/");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(JSON.stringify(data));
});

// Student Signup
// -----------------------------------------------------------

$("#stuSignupBtn").on("click", function () {
    var data = {
        "name": document.studentSignup.name.value,
        "uid": document.studentSignup.uid.value,
        "email": document.studentSignup.email.value,
        "password": document.studentSignup.pass.value
    };
    console.log(data);

    let error = "";
    let name = /^[a-zA-Z ]*$/;
    let uid = /^[0-9]{2}[A-Z]{3}[0-9]{4}$/;
    let password = /^.{8,}$/;
    let flag = 0
    if (!name.test(data['name'])) {
        error += ">> Enter only Alphabets in name!\n";
        flag = 1;
    }
    if (!uid.test(data['uid'])) {
        error += ">> Enter correct format of Reg No.!\n";
        flag = 1;
    }
    if (!password.test(data['password'])) {
        error += ">> Please enter correct password!\n";
        flag = 1;
    }
    if (flag) {
        return alert(error);
    }

    var xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log('this.responseText :>> ', this.responseText);
            console.log('this.status :>> ', this.status);

            if (this.status >= 200 && this.status < 400) {
                // The request has been completed successfully
                var data = JSON.parse(this.responseText)

                sessionStorage.setItem("Token", "Token " + data.token)
                sessionStorage.setItem("ac_type", data.ac_type)
                sessionStorage.setItem("name", data.name)
                sessionStorage.setItem("email", data.email)
                sessionStorage.setItem("uid", data.uid)

                //The user has successfully authenticated.
                sessionStorage.setItem("AuthenticationState", "Authenticated");

                //This authentication key will expire in 1 hour.
                sessionStorage.setItem("AuthenticationExpires", new Date().addHours(1));

                window.location.replace('dashboard.html')
            } else {
                try {
                    var data = JSON.parse(this.responseText);
                    alert(Object.values(data)[0][0]);
                }
                catch (err) {
                    alert("Error signing up! Please contact admin.");
                }

            }
        }
    });

    xhr.open("POST", "https://projenarator.herokuapp.com/register-student/");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(JSON.stringify(data));
});

// Student Signin
// -----------------------------------------------------------

$("#stuSigninBtn").on("click", function () {
    var data = {
        "uid": document.studentSignin.uid.value,
        "password": document.studentSignin.pass.value
    };
    console.log(data);

    let error = "";
    let uid = /^[0-9]{2}[A-Z]{3}[0-9]{4}$/;
    let password = /^.{8,}$/;
    let flag = 0

    if (!uid.test(data['uid'])) {
        error += ">> Enter correct format of Reg No.!\n";
        flag = 1;
    }
    if (!password.test(data['password'])) {
        error += ">> Please enter correct password!\n";
        flag = 1;
    }
    if (flag) {
        return alert(error);
    }

    var xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log('this.responseText :>> ', this.responseText);
            console.log('this.status :>> ', this.status);

            if (this.status >= 200 && this.status < 400) {
                // The request has been completed successfully
                var data = JSON.parse(this.responseText)
                if (data.ac_type == "Student") {
                    sessionStorage.setItem("ac_type", data.ac_type)
                    sessionStorage.setItem("Token", "Token " + data.token)
                    sessionStorage.setItem("name", data.name)
                    sessionStorage.setItem("email", data.email)
                    sessionStorage.setItem("uid", data.uid)

                    //The user has successfully authenticated.
                    sessionStorage.setItem("AuthenticationState", "Authenticated");

                    //This authentication key will expire in 1 hour.
                    sessionStorage.setItem("AuthenticationExpires", new Date().addHours(1));

                    window.location.replace('dashboard.html')
                }
                else {
                    alert("The account does not belong to Student! Try faculty login.")
                }
            } else {
                try {
                    var data = JSON.parse(this.responseText);
                    alert(Object.values(data)[0][0]);
                }
                catch (err) {
                    alert("Error signing in! Please contact admin.");
                }
            }
        }
    });

    xhr.open("POST", "https://projenarator.herokuapp.com/login/");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(JSON.stringify(data));
});