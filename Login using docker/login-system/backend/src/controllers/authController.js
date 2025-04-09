// backend/src/controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Registrar usuario
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findByEmail(email);

    if (existingUser) {
      return res.status(401).json({ message: "El usuario ya existe" });
    }

    // Crear nuevo usuario
    const newUser = await User.create(name, email, password);

    // Generar token JWT
    const token = generateJWT(newUser.id);

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Error del servidor" });
  }
};

// Login de usuario
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar si el usuario existe
    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(401).json({ message: "Email o contraseña incorrectos" });
    }

    // Verificar si la contraseña es correcta
    const validPassword = await User.verifyPassword(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: "Email o contraseña incorrectos" });
    }

    // Generar token JWT
    const token = generateJWT(user.id);

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Error del servidor" });
  }
};

// Verificar usuario autenticado
exports.verify = async (req, res) => {
  try {
    // req.user proviene del middleware
    const user = await User.findById(req.user);
    
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    
    res.json({ name: user.name });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Error del servidor" });
  }
};

// Función para generar JWT
function generateJWT(user_id) {
  return jwt.sign({ user: user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
}