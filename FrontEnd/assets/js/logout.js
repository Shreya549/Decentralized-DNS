// Logout --------------------------------------------------------------
$(document).ready(function () {
    $("#logout").click(function () {
        console.log('logout');
        sessionStorage.clear();
        window.location.replace('./');
    });
});
