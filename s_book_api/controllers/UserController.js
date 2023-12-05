import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const secretKey = '1234567890';

class UserController {
  static createUser = async (req, res) => {
    try {
      const { email, username, password } = req.body;

      // Verifica se o usuário já existe
      const existingUser = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (existingUser) {
        return res.status(400).json({ error: 'Email already in use' });
      }

      // Hash da senha antes de armazenar no banco de dados
      const hashedPassword = await bcrypt.hash(password, 10);

      // Criação do usuário no banco de dados
      const newUser = await prisma.user.create({
        data: {
          email,
          username,
          password: hashedPassword,
        },
      });

      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  // ...

static loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Verifica se o usuário existe
      const existingUser = await prisma.user.findUnique({
        where: {
          email,
        },
      });
  
      if (!existingUser) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Compara a senha fornecida com a senha armazenada no banco de dados
      const passwordMatch = await bcrypt.compare(password, existingUser.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid password' });
      }
  
      // Gera um token JWT
      const token = jwt.sign({ userId: existingUser.email }, secretKey, { expiresIn: '1h' });
  
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.error('Error logging in user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };  
}

export default UserController;
