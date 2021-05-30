function preloadFunc() {
    //Is the user authenticated?
    if (sessionStorage.getItem('AuthenticationState') === null) {
        sessionStorage.clear();
        window.open("./", "_self");
    }
    //Is their authentication token still valid?
    else if (Date.now() > new Date(sessionStorage.getItem('AuthenticationExpires'))) {
        sessionStorage.clear();
        window.open("./", "_self");
    }
    else {
        //The user is authenticated and the authentication has not expired.
        let ac_type = sessionStorage.getItem("ac_type");
        let curr_loc = window.location.href.split("/");
        if (ac_type == "Student" && curr_loc == "dashboardf.html") {
            window.open("dashboard.html", "_self");
        }
        if (ac_type == "Faculty" && (curr_loc == "dashboard.html" || curr_loc == "addproject.html")) {
            window.open("dashboardf.html", "_self");
        }

    }
};
window.onpaint = preloadFunc();