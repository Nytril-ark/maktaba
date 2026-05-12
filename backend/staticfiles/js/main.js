document.addEventListener( "DOMContentLoaded", () => {
    const role = localStorage.getItem( "Role" ) || "Guest";

    const loginButton = document.getElementById( "login" );
    const logoutButton = document.getElementById( "logoutButton" );

    const profileSection = document.getElementById( "profileSection" );
    const profileIcon = document.getElementById( "profileIcon" );
    const dropDownMenu = document.getElementById( "dropDownMenu" );

    const mobileNav = document.getElementById( "Mobile-view-menu" );
    const wrapperNav = document.getElementById( "wrapper-nav" );
    const closeBtn = document.getElementById( "close-button" );
    const navBorrowed = document.getElementById( "navborrowed" );

    const username = document.getElementById( "username" );
    const email = document.getElementById( "email" );


    let logedUser = JSON.parse( localStorage.getItem( "LogedUser" ) ) || null;

    if ( !role ) {
        localStorage.setItem( "Role", "Guest" );
    }

    if ( role === "Admin" ) {
        if ( !window.location.href.includes( "admin_dashboard.html" ) && !window.location.href.includes( "book_inventory.html" ) && !window.location.href.includes( "add_book.html" ) && !window.location.href.includes( "edit_book.html" ) ) {
            window.location.replace( "admin_dashboard.html" );
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
// Ramy edited log out only in this file
    if ( logoutButton ) {
        logoutButton.addEventListener( "click", async function ( e ) {
            e.preventDefault();
            sessionStorage.clear();
            localStorage.setItem( "Role", "Guest" );
            await fetch('/api/accounts/api/logout/',{method:'POST'});
            window.location.replace( "/api/accounts/login/" );
        } );
    }

    if ( profileIcon ) {
        profileIcon.addEventListener( "click", function ( e ) {
            e.preventDefault();
            dropDownMenu.classList.toggle( "show" );
        } );
    }

    if ( username ) {
        if ( logedUser ) {
            username.textContent = logedUser.UserName;
        }
    }

    if ( email ) {
        if ( logedUser ) {
            email.textContent = logedUser.Email;
        }
    }

    if ( mobileNav && wrapperNav ) {
        mobileNav.addEventListener( "click", function ( e ) {
            e.preventDefault();
            wrapperNav.classList.add( "active" );
        } );
    }
    if ( closeBtn && wrapperNav ) {
        closeBtn.addEventListener( "click", function ( e ) {
            wrapperNav.classList.remove( "active" );
        } )
    }

    if ( navBorrowed ) {
        navBorrowed.addEventListener( "click", function ( e ) {
            e.preventDefault();
            if ( role === "Guest" ) {
                alert( "You have to login first" );
                window.location.replace( "login.html" );
            } else {
                window.location.replace( '/api/borrowing/borrowedbooks/' );
            }
        } );
    }

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
// browse books
export async function getBooks() {
    const res = await fetch("/api/books/js/");
    const data = await res.json();
    return data
}