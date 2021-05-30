if (
    (sessionStorage.getItem('AuthenticationState') == "Authenticated")
    && (Date.now() < new Date(sessionStorage.getItem('AuthenticationExpires')))
    && ((window.location.pathname == "") || (window.location.pathname == "index.html"))
) {
    window.location.replace('dashboard.html');
}