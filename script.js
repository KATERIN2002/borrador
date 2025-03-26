document.getElementById("loginForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Evita que la página se recargue

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const message = document.getElementById("message");

  // Simulación de usuario válido
  const user = "admin";
  const pass = "12345";

  if (username === user && password === pass) {
      message.style.color = "green";
      message.textContent = "Inicio de sesión exitoso ✅";
      setTimeout(() => {
          window.location.href = "dashboard.html"; // Redirige a otra página
      }, 1000);
  } else {
      message.style.color = "red";
      message.textContent = "Usuario o contraseña incorrectos ❌";
  }
});

// Mostrar el formulario de recuperación de contraseña
document.getElementById("forgotPassword").addEventListener("click", function (event) {
  event.preventDefault();
  document.getElementById("resetSection").classList.remove("hidden");
});

// Simular el envío del código de recuperación
document.getElementById("resetButton").addEventListener("click", function () {
  const email = document.getElementById("email").value;
  const resetMessage = document.getElementById("resetMessage");

  if (email.includes("@")) { // Validación simple de correo
      resetMessage.style.color = "green";
      resetMessage.textContent = "Se ha enviado un código de recuperación a tu correo 📧";
  } else {
      resetMessage.style.color = "red";
      resetMessage.textContent = "Por favor, ingresa un correo válido ❌";
  }
});
