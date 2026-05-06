document.querySelector("form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Password and Confirm Password is different");
    return;
  }

  const res = await fetch("http://127.0.0.1:8000/api/accounts/signup/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: document.getElementById("username").value,
      email: document.getElementById("email").value,
      password,
    }),
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.error);
    return;
  }

  sessionStorage.setItem("role", data.role);
  sessionStorage.setItem("email", data.email);
  window.location.replace("index.html");
});
