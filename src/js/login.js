document.querySelector("form").addEventListener("submit", async function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("http://127.0.0.1:8000/api/accounts/login/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.error);
    return;
  }

  sessionStorage.setItem("role", data.role);
  sessionStorage.setItem("email", data.email);

  if (data.role === "admin") {
    window.location.replace("admin_dashboard.html");
  } else {
    window.location.replace("index.html");
  }
});
