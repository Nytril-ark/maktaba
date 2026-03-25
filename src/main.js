if (!localStorage.getItem( "Role" ) ) {
    localStorage.setItem( "Role", "Guest" );
}

if ( localStorage.getItem( "Role" ) !== "Admin" ) {
    document.getElementById( "admin_dashboard" ).style.display = "none";
}

if ( localStorage.getItem( "Role" ) !== "Guest" ) {
    document.getElementById( "sign_up" ).style.display = "none";
    document.getElementById( "login" ).style.display = "none";
} else {
    document.getElementById( "sign_out" ).style.display = "none";
}

document.getElementById( "sign_out" ).addEventListener( "click", function ( e ) {
    localStorage.setItem( "Role", "Guest" );
    localStorage.removeItem( "LogedUser" );
    window.location.replace( "login.html" );
} );

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
