// authMiddleware.js
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

console.log('jwtSecret: ', jwtSecret)

export const authenticateToken = (req, res, next) => {
    console.log('Authorization Header:', req.headers['authorization']);
    const token = req.headers['authorization'];
    
    const tokenSinBearer = token.replace('Bearer ', '');
    console.log('tokenSinBearer:', tokenSinBearer)
  
    if (!token) {
      return res.status(401).json({ message: 'No se proporcionó un token de autenticación' });
    }
  
    jwt.verify(tokenSinBearer, jwtSecret, (err, decoded) => {
      if (err) {
        console.log('Error al decodificar el token:', err);
        return res.status(403).json({ message: 'Token inválido' });
      }
      
      req.user = decoded; // Establecer req.user con los datos decodificados del token
      next();
    });
  };
  

export const checkRole = (roles) => (req, res, next) => {
    const userRole = req.user.role;
    console.log('userRole:')
    console.log(userRole)
  
    if (!roles.includes(userRole)) {
      return res.status(403).json({ message: 'No tienes permiso para acceder a esta ruta' });
    }
  
    next();
  };
  
  
