const loginButton = document.getElementById( "login" );
const logoutButton = document.getElementById( "logoutButton" );
const logoutButton2 = document.getElementById( "logoutButton2" );

const profileSection = document.getElementById( "profileSection" );
const profileIcon = document.getElementById( "profileIcon" );
const dropDownMenu = document.getElementById( "dropDownMenu" );

const username = document.getElementById( "username" );
const email = document.getElementById( "email" );

let logeUser = JSON.parse( localStorage.getItem( "LogedUser" ) ) || null;

if ( !localStorage.getItem( "Role" ) ) {
    localStorage.setItem( "Role", "Guest" );
}

if ( localStorage.getItem( "Role" ) === "Admin" ) {
    if ( !window.location.href.includes("admin_dashboard.html") ) {
        window.location.replace("admin_dashboard.html");
    }
}

if ( localStorage.getItem( "Role" ) !== "Guest" ) {
if ( loginButton ) {
    loginButton.style.display = "none";
}

if ( profileSection ) {
    profileSection.style.display = "block";
}
}

if ( logoutButton ) {
    logoutButton.addEventListener( "click", function ( e ) {
        e.preventDefault();
        localStorage.setItem( "Role", "Guest" );
        localStorage.removeItem( "LogedUser" );
        window.location.replace( "index.html" );
    });
}

if ( profileIcon ) {
    profileIcon.addEventListener( "click", function ( e ) {
        e.preventDefault();
        dropDownMenu.classList.toggle( "show" );
    });
}

if ( username ) {
    if (logeUser) {    
        username.textContent = logeUser.UserName;
    }
}

if ( email ) {
    if (logeUser) {    
        email.textContent = logeUser.Email;
    }
}

var allUsers = JSON.parse( localStorage.getItem( "AllUsers" ) ) || [];

if ( allUsers.length === 0 ) {
    
    let adminUser = {
        FirstName: "Admin",
        LastName: "System",
        Birthday: "2000-01-01",
        UserName: "admin",
        Email: "admin@library.com",
        Password: "admin", 
        role: "Admin"      
    };
    allUsers.push( adminUser );
    localStorage.setItem( "AllUsers", JSON.stringify(allUsers) );
}