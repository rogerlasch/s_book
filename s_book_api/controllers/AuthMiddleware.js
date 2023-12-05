// authMiddleware.js
import jwt from 'jsonwebtoken';

const secretKey = '1234567890'; // Mesma chave usada na geração do token

export const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Token not provided' });
  }
console.log("Token: {}}", token);
  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Forbidden: Invalid token' });
    }
    req.user = user;
    next();
  });
};
