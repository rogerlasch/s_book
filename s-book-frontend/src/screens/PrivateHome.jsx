import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddEditBook from './AddEditBookPage.jsx'; // Importe o componente AddEditBook
import TokenController from '../controller/TokenController';

const PrivateHome = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/book', {
          method: 'GET',
          headers: {
            'Authorization': `${TokenController.getToken()}`, 
          },
        });

        if (response.ok) {
          const booksData = await response.json();
          setBooks(booksData);
        } else {
          console.error('Erro ao obter a lista de livros:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Erro ao obter a lista de livros:', error);
      }
    };

    fetchBooks(); 
  }, []);

  const handleEditBook = (bookId) => {
    
    console.log(`Editando o livro com ID ${bookId}`);

    let bookDetails = books.find(book => book.id === bookId);
    bookDetails.id=bookId;
    setSelectedBook(bookDetails);
  };

  const handleDeleteBook = async (bookId) => {
    try {
      
      const responce= await fetch(`http://localhost:3000/api/book/${bookId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `${TokenController.getToken()}`, 
        },
      });

      if(responce.status===200){
      
      setBooks((prevBooks) => prevBooks.filter(book => book.id !== bookId));
      console.log(`Livro com ID ${bookId} excluído com sucesso`);
      toast.success("Sucesso ao excluir o livro", {autoClose:2000});
      }
      else{
toast.error("Erro ao excluir o livro selecionado", {autoClose:2000});
      }
    } catch (error) {
      console.error(`Erro ao excluir o livro com ID ${bookId}:`, error);
    }
  };

  const handleCancelEdit = () => {
    setSelectedBook(null);
  };

  const handleSaveBook = async (newBook) => {
    try {
      
      if (newBook.id) {
        
        
        const responce=await fetch(`http://localhost:3000/api/book/${newBook.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${TokenController.getToken()}`, 
          },
          body: JSON.stringify(newBook),
        });

        if(responce.status===200){
        
        setBooks((prevBooks) => prevBooks.map(book => (book.id === newBook.id ? newBook : book)));
        console.log('Livro editado com sucesso');
        toast.success("Sucesso ao atualizar o livro!", {autoClose:2000});
        }
      } else {
        
        
        const response = await fetch('http://localhost:3000/api/book', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${TokenController.getToken()}`, 
          },
          body: JSON.stringify(newBook),
        });

        if (response.ok) {
          const createdBook = await response.json();
          
          setBooks((prevBooks) => [...prevBooks, createdBook]);
          console.log('Novo livro criado com sucesso');
          toast.success("Livro criado com sucesso!", {autoClose:2000});
        } else {
          console.error('Erro ao criar o novo livro:', response.status, response.statusText);
          toast.error("Erro ao criar o livro!\n"+response.status, {autoClose:2000});
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
      <Link to="#" onClick={() => setSelectedBook({})}>Adicionar Novo Livro</Link>

      {/* Renderiza o componente AddEditBook apenas se selectedBook não for nulo */}
      {selectedBook !== null && (
        <AddEditBook
          selectedBook={selectedBook}
          onSave={handleSaveBook}
          onCancel={handleCancelEdit}
        />
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
