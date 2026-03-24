localStorage.setItem( "Role", "Guest" );

document.querySelector( 'form' ).addEventListener( 'submit', function ( e ) {
    e.preventDefault();
    
    const passwordInput = document.getElementById( "password" ).value;
    const confirmPasswordInput = document.getElementById( "confirmPassword" ).value;
    
    if ( passwordInput !== confirmPasswordInput ) {
        alert( "Password and Confirm Password is different" );
        return;
    }

    let user = {
        FirstName: document.getElementById( "fname" ).value,
        LastName: document.getElementById( "lname" ).value,
        Birthday: document.getElementById( "birthday" ).value,
        UserName: document.getElementById( "username" ).value,
        Email: document.getElementById( "email" ).value,
        Password: passwordInput,
        role : "STUDENT",
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
        localStorage.setItem( "AllUsers", allUsers );
    }
    
    if ( allUsers.find( u => u.Email === user.Email ) ) {
        alert("This email is already registered!");
        return;
    }
    
    if ( allUsers.find( u => u.UserName === user.UserName ) ) {
        alert("This Username is already Taken");
        return;
    }
    
    allUsers.push( user );
    localStorage.setItem( "AllUsers", JSON.stringify( allUsers ) );
    
    alert( "Account created successfully!" );
    window.location.replace( "login.html" );
});
