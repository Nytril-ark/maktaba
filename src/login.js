document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    const emailInput = document.getElementById("email").value;
    const passwordInput = document.getElementById("password").value;

    const rawData = localStorage.getItem("AllUsers");
    const allUsers = JSON.parse(rawData) || [];

    const foundUser = allUsers.find(user => user.Email === emailInput);

    if (foundUser) {
        if (foundUser.Password === passwordInput) {
            localStorage.setItem( "Role", foundUser.role );
            localStorage.setItem( "LogedUser", JSON.stringify(foundUser) );
            window.location.replace( "index.html" );
            
            if (foundUser.role === "Admin") {
                 window.location.replace("admin_dashboard.html");
            } else {
                window.location.replace("index.html");
    }
        } else {
            alert("Password is Wrong");
        }
    } else {
        alert("Account not found");
    }
});
