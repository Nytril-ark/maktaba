document.addEventListener("DOMContentLoaded", async () => {
  const role = sessionStorage.getItem("role") || "guest";
  const email = sessionStorage.getItem("email") || null;

  const loginButton = document.getElementById("login");
  const logoutButton = document.getElementById("logoutButton");
  const profileSection = document.getElementById("profileSection");
  const profileIcon = document.getElementById("profileIcon");
  const dropDownMenu = document.getElementById("dropDownMenu");
  const mobileNav = document.getElementById("Mobile-view-menu");
  const wrapperNav = document.getElementById("wrapper-nav");
  const closeBtn = document.getElementById("close-button");
  const navBorrowed = document.getElementById("navborrowed");
  const usernameEl = document.getElementById("username");
  const emailEl = document.getElementById("email");

  if (role === "admin") {
    if (!window.location.href.includes("admin_dashboard.html") && !window.location.href.includes("book_inventory.html") && !window.location.href.includes("add_book.html") && !window.location.href.includes("edit_book.html")) {
      window.location.replace("admin_dashboard.html");
    }
  }

  if (role !== "guest") {
    if (loginButton) loginButton.style.display = "none";
    if (profileSection) profileSection.style.display = "block";
  }

  if (logoutButton) {
    logoutButton.addEventListener("click", async function (e) {
      e.preventDefault();
      await fetch("http://127.0.0.1:8000/api/accounts/logout/", {
        method: "POST",
        credentials: "include",
      });
      sessionStorage.clear();
      window.location.replace("index.html");
    });
  }

  if (profileIcon) {
    profileIcon.addEventListener("click", function (e) {
      e.preventDefault();
      dropDownMenu.classList.toggle("show");
    });
  }

  if (emailEl && email) emailEl.textContent = email;

  if (mobileNav && wrapperNav) {
    mobileNav.addEventListener("click", function (e) {
      e.preventDefault();
      wrapperNav.classList.add("active");
    });
  }

  if (closeBtn && wrapperNav) {
    closeBtn.addEventListener("click", function (e) {
      wrapperNav.classList.remove("active");
    });
  }

  if (navBorrowed) {
    navBorrowed.addEventListener("click", function (e) {
      e.preventDefault();
      if (role === "guest") {
        alert("You have to login first");
        window.location.replace("login.html");
      } else {
        window.location.replace("BorrowedBooks.html");
      }
    });
  }
});

export async function getBooks() {
  const res = await fetch("http://127.0.0.1:8000/api/books/");
  const data = await res.json();
  return data;
}

