const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // Obtener token del header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: "No autorizado" });
    }
    
    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: "No autorizado, token no proporcionado" });
    }

    // Verificar token
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload.user;
    
    next();
  } catch (err) {
    console.error(err.message);
    return res.status(401).json({ message: "Token no válido" });
  }
};