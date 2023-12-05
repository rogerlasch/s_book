import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class BookController {
  // Método para criar um novo livro
  static create = async (req, res) => {
    try {
      const { title, author, pages } = req.body;

      const newBook = await prisma.book.create({
        data: {
          title:title,
          author:author,
          pages:parseInt(pages)
        },
      });

      res.status(200).json(newBook);
    } catch (error) {
      console.error('Error creating book:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  // Método para atualizar um livro existente
  static update = async (req, res) => {
    try {
      const bookId = parseInt(req.params.id);
      const { title, author, pages } = req.body;

      const updatedBook = await prisma.book.update({
        where: { id: bookId },
        data: {
          title:title,
          author:author,
          pages:parseInt(pages)
        },
      });

      res.status(200).json(updatedBook);
    } catch (error) {
      console.error('Error updating book:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  // Método para obter um livro por ID
  static getById = async (req, res) => {
    try {
      const bookId = parseInt(req.params.id);

      const book = await prisma.book.findUnique({
        where: { id: bookId },
      });

      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }

      res.status(200).json(book);
    } catch (error) {
      console.error('Error getting book by ID:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  // Método para excluir um livro por ID
  static deleteById = async (req, res) => {
    try {
      const bookId = parseInt(req.params.id);

      await prisma.book.delete({
        where: { id: bookId },
      });

      res.status(200).end(); // No Content
    } catch (error) {
      console.error('Error deleting book by ID:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  // Método para obter todos os livros
  static getBooks = async (req, res) => {
    try {
      const books = await prisma.book.findMany();
      res.status(200).json(books);
    } catch (error) {
      console.error('Error getting books:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
}

export default BookController;
