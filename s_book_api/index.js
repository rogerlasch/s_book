import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import UserController from './controllers/UserController.js';
import BookController from './controllers/BookController.js';
import { authenticateToken } from './controllers/AuthMiddleware.js';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

// Rotas do usuário
app.post('/api/user', UserController.createUser);
app.post('/api/login', UserController.loginUser);

// Middleware de autenticação para as rotas de livros
app.use('/api/book', authenticateToken);

// Rotas do livro
app.post('/api/book', BookController.create);
app.put('/api/book/:id', BookController.update);
app.get('/api/book/:id', BookController.getById);
app.delete('/api/book/:id', BookController.deleteById);
app.get('/api/book', BookController.getBooks);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
