if (!localStorage.getItem( "Role" ) ) {
    localStorage.setItem( "Role", "Guest" );
}

// if ( localStorage.getItem( "Role" ) !== "Admin" ) {
//     document.getElementById( "admin_dashboard" ).style.display = "none";
// }
const loginButton = document.getElementById( "login" );
const logoutButton = document.getElementById( "logoutButton" );

const profileSection = document.getElementById( "profileSection" );
const profileIcon = document.getElementById( "profileIcon" );
const dropDownMenu = document.getElementById( "dropDownMenu" );
if ( localStorage.getItem( "Role" ) !== "Guest" ) {
    loginButton.style.display = "none";
    profileSection.style.display = "block";
}

// document.getElementById( "sign_out" ).addEventListener( "click", function ( e ) {
//     localStorage.setItem( "Role", "Guest" );
//     localStorage.removeItem( "LogedUser" );
//     window.location.replace( "login.html" );
// });
if ( logoutButton ) {
    loginButton.addEventListener( "click", function ( e ) {
        localStorage.setItem( "Role", "Guest" );
        localStorage.removeItem( "LogedUser" );
        window.location.replace( "login.html" );
    });
}
if ( profileIcon ) {
    profileIcon.addEventListener( "", function ( e ) {
        dropDownMenu.classList.toggle( "show" );
    } );
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



document.addEventListener("DOMContentLoaded", function() {
    
    // ==========================================
    // 1. جزء زميلك: إنشاء الـ Admin الافتراضي
    // ==========================================
    var allUsers = JSON.parse( localStorage.getItem( "AllUsers" ) ) || [];
    if ( allUsers.length === 0 ) {
        let adminUser = {
            FirstName: "Admin", LastName: "System", Birthday: "2000-01-01",
            UserName: "admin", Email: "admin@library.com", Password: "admin", role: "Admin"      
        };
        allUsers.push( adminUser );
        localStorage.setItem( "AllUsers", JSON.stringify(allUsers) );
    }

    if (!localStorage.getItem( "Role" ) ) {
        localStorage.setItem( "Role", "Guest" );
    }

    // ==========================================
    // 2. دمج اللوجيك: ربط البيانات بالناف بار الجديد
    // ==========================================
    const currentRole = localStorage.getItem("Role");
    const rawData = localStorage.getItem("LogedUser");
    const loggedInUser = JSON.parse(rawData);

    // بنجيب عناصر الناف بار الجديد
    const loginLink = document.querySelector('.userAction > a[href="login.html"]'); 
    const profileSection = document.querySelector('.profile');
    const adminDashboardLink = document.getElementById('admin_dashboard');
    const roleText = document.querySelector('.userInfo .role');
    const emailText = document.querySelector('.userInfo .email');

    // التحكم في الـ Admin Dashboard
    if (adminDashboardLink) {
        if (currentRole !== "Admin") {
            adminDashboardLink.style.display = "none"; // نخفيه لو مش أدمن
        } else {
            adminDashboardLink.style.display = "inline-block"; // نظهره لو أدمن
        }
    }

    // التحكم في زرار اللوجين والبروفايل
    if (currentRole !== "Guest" && loggedInUser) {
        // لو مسجل دخول (سواء Admin أو Student)
        if(loginLink) loginLink.style.display = "none";
        if(profileSection) profileSection.style.display = "block";
        
        // تحديث بيانات القائمة المنسدلة
        if(roleText) roleText.textContent = currentRole;
        if(emailText) emailText.textContent = loggedInUser.Email;
    } else {
        // لو Guest (مش مسجل دخول)
        if(loginLink) loginLink.style.display = "block";
        if(profileSection) profileSection.style.display = "none";
    }

    // ==========================================
    // 3. جزء الناف بار بتاعك: تشغيل القائمة والخروج
    // ==========================================
    const profileIconBtn = document.getElementById('profileIcon');
    const dropDownMenu = document.getElementById('dropDownMenu');
    const logoutButton = document.getElementById('logoutButton');

    // فتح وقفل القائمة
    if (profileIconBtn) {
        profileIconBtn.addEventListener("click", function(e) {
            e.stopPropagation(); 
            dropDownMenu.classList.toggle("show");
        });
    }

    // الخروج (مدمج فيه كود زميلك لتغيير الرول لـ Guest)
    if (logoutButton) {
        logoutButton.addEventListener("click", function(e) {
            e.preventDefault();
            localStorage.setItem("Role", "Guest"); // كود زميلك
            localStorage.removeItem("LogedUser"); // كود زميلك
            window.location.replace("login.html"); // كود زميلك للرجوع لصفحة اللوجين
        });
    }

    // قفل القائمة لو داس في أي حتة فاضية
    window.addEventListener("click", function(event) {
        if (!event.target.closest('.profile')) {
            if (dropDownMenu && dropDownMenu.classList.contains('show')) {
                dropDownMenu.classList.remove('show');
            }
        }
    });
});