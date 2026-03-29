const role = localStorage.getItem( "Role" )||"Guest";

const loginButton = document.getElementById( "login" );
const logoutButton = document.getElementById( "logoutButton" );

const profileSection = document.getElementById( "profileSection" );
const profileIcon = document.getElementById( "profileIcon" );
const dropDownMenu = document.getElementById( "dropDownMenu" );

const navBorrowed = document.getElementById( "navborrowed" );

const username = document.getElementById( "username" );
const email = document.getElementById( "email" );


let logeUser = JSON.parse( localStorage.getItem( "LogedUser" ) ) || null;

if ( !role ) {
    localStorage.setItem( "Role", "Guest" );
}

if ( role === "Admin" ) {
    if ( !window.location.href.includes("admin_dashboard.html") && !window.location.href.includes("book_inventory.html") && !window.location.href.includes("add_book.html") && !window.location.href.includes("edit_book.html") ) {
        window.location.replace("admin_dashboard.html");
    }
}

if ( role !== "Guest" ) {
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

if ( navBorrowed ) {
    navBorrowed.addEventListener( "click", function ( e ) {
        e.preventDefault(); 
        if ( role === "Guest" ) {
            alert( "You have to login first" );
            window.location.replace( "login.html" );
        } else {
            window.location.replace( "BorrowedBooks.html" );
        }
    });
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

export async function getBooks() {
    const res = await fetch("../data/books.json");
    const data = await res.json();
    return data
}