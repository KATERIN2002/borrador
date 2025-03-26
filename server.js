require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

// Configuración de transporte de Nodemailer (Gmail)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Tu correo
    pass: process.env.EMAIL_PASS  // Contraseña o App Password
  }
});

// Ruta para enviar código de recuperación
app.post("/send-recovery-code", (req, res) => {
  const { email } = req.body;

  if (!email.includes("@")) {
    return res.status(400).json({ error: "Correo inválido" });
  }

  // Generar un código de 6 dígitos
  const recoveryCode = Math.floor(100000 + Math.random() * 900000);

  // Configuración del correo
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Código de recuperación",
    text: `Tu código de recuperación es: ${recoveryCode}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Error al enviar el correo" });
    }
    res.json({ message: "Código enviado correctamente", code: recoveryCode });
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
