
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    const emailInput = document.getElementById("email").value;
    const passwordInput = document.getElementById("password").value;

    const rawData = localStorage.getItem("AllUsers");
    const allUsers = JSON.parse(rawData) || [];

    const foundUser = allUsers.find(user => user.Email === emailInput);

    if (foundUser) {
        if (foundUser.Password === passwordInput) {
            localStorage( "Role", foundUser.role );
            localStorage.setItem( "LogedUser", foundUser );
            window.location.replace( "index.html" );
            
        } else {
            alert("Password is Wrong");
        }
    } else {
        alert("Account not found");
    }
});