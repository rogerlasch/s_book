import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddEditBook from './AddEditBookPage.jsx';
import BookController from '../controllers/BookController.js';

const PrivateHome = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
const hcon=new BookController();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        
const res=await hcon.getBooks();        
if(res.status===200){
        setBooks(res.books);
}
      } catch (error) {
        console.error('Erro ao obter a lista de livros:', error);
      }
    };

    fetchBooks();
  }, []);

  const handleEditBook = (bookId) => {
    console.log(`Editando o livro com ID ${bookId}`);
    const bookDetails = books.find((book) => book.id === bookId);
    setSelectedBook(bookDetails);
  };

  const handleDeleteBook = async (bookId) => {
    try {
  const res=await hcon.deleteBook(bookId)    ;
  if(res.status===200){
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
      console.log(`Livro com ID ${bookId} excluído com sucesso`);
      toast.success('Sucesso ao excluir o livro', { autoClose: 2000 });
  }
  else{
    toast.error("Erro ao remover o livro com id ${bookId}\n"+res.error, {autoClose:2000});
  }
    } catch (error) {
      console.error(`Erro ao excluir o livro com ID ${bookId}:`, error);
      toast.error('Erro ao excluir o livro selecionado', { autoClose: 2000 });
    }
  };

  const handleCancelEdit = () => {
    setSelectedBook(null);
  };

  const handleSaveBook = async (newBook) => {
    try {
      
      if (newBook.id!==0) {
        const res=await hcon.updateBook(newBook);
        if(res.status===200){
          setBooks((prevBooks) => prevBooks.map(book => (book.id === newBook.id ? newBook : book)));
          toast.success('Sucesso ao atualizar o livro!', { autoClose: 2000 });
        }
        else{
          toast.error("Erro ao atualizar o livro.\n"+res.error, {autoClose:2000});
        }
      } else {
        const res=await hcon.addBook(newBook);
        if(res.status===200){
          setBooks((prevBooks) => [...prevBooks, res.book]);
          toast.success("Livro adicionado com sucesso!", {autoClose:2000});
        }
        else{
          toast.error("Erro ao atualizar o livro.\n"+res.error, {autoClose:2000});
        }
      }

      setSelectedBook(null);
    } catch (error) {
      console.error('Ocorreu um erro ao salvar o livro:', error);
    }
  };

  return (
    <div>
      <h2>Lista de Livros</h2>
      <Link to="#" onClick={() => setSelectedBook({})}>
        Adicionar Novo Livro
      </Link>

      {selectedBook !== null && (
        <AddEditBook selectedBook={selectedBook} onSave={handleSaveBook} onCancel={handleCancelEdit} />
      )}

      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Autor</th>
            <th>Páginas</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.pages}</td>
              <td>
                <button onClick={() => handleEditBook(book.id)}>Editar</button>
                <button onClick={() => handleDeleteBook(book.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PrivateHome;
