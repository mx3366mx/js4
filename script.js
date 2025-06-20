let users = JSON.parse(localStorage.getItem("users")) || [];

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function register() {
  const email = document.getElementById("register-email").value.trim();
  const password = document.getElementById("register-password").value.trim();

  if (!validateEmail(email)) {
    alert("❌ Invalid email format");
    return;
  }

  if (users.find(user => user.email === email)) {
    alert("❌ Email already registered");
    return;
  }

  users.push({ email, password });
  localStorage.setItem("users", JSON.stringify(users));
  alert("✅ Registered successfully!");
  showLogin();
}

function login() {
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();

  const user = users.find(u => u.email === email);

  if (!user) {
    alert("❌ Email not found");
    return;
  }

  if (user.password !== password) {
    alert("❌ Incorrect password");
    return;
  }

  sessionStorage.setItem("loggedUser", email);
  showHome();
}

function showLogin() {
  document.getElementById("register-form").style.display = "none";
  document.getElementById("login-form").style.display = "block";
}

function showRegister() {
  document.getElementById("register-form").style.display = "block";
  document.getElementById("login-form").style.display = "none";
}

function showHome() {
  const user = sessionStorage.getItem("loggedUser");
  if (!user) {
    alert("❌ Please login first");
    return;
  }
  document.getElementById("auth-container").style.display = "none";
  document.getElementById("home").style.display = "block";
  document.getElementById("username").innerText = user;
}

function logout() {
  sessionStorage.removeItem("loggedUser");
  document.getElementById("home").style.display = "none";
  document.getElementById("auth-container").style.display = "block";
  showLogin();
}

window.onload = function() {
  if (sessionStorage.getItem("loggedUser")) {
    showHome();
  } else {
    showLogin();
  }
};
