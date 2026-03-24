if (!localStorage.getItem( "Role" ) ) {
    localStorage.setItem( "Role", "Guest" );
}

if ( localStorage.getItem( "Role" ) !== "Admin" ) {
    document.getElementById( "admin_dashboard" ).style.display = "none";
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
