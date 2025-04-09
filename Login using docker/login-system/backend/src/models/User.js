// backend/src/models/User.js
const pool = require('../config/db');
//const bcrypt = require('bcrypt');
const bcrypt = require('bcryptjs');


class User {
  // Encontrar usuario por ID
  static async findById(id) {
    try {
      const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
      return user.rows[0];
    } catch (err) {
      throw new Error(err.message);
    }
  }

  // Encontrar usuario por email
  static async findByEmail(email) {
    try {
      const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
      return user.rows[0];
    } catch (err) {
      throw new Error(err.message);
    }
  }

  // Crear nuevo usuario
  static async create(name, email, password) {
    try {
      // Encriptar contraseña
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Insertar usuario en la base de datos
      const newUser = await pool.query(
        "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
        [name, email, hashedPassword]
      );

      return newUser.rows[0];
    } catch (err) {
      throw new Error(err.message);
    }
  }

  // Verificar contraseña
  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = User;