import React, { useState, useEffect } from 'react';

const AddEditBook = ({ selectedBook, onSave, onCancel }) => {
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [pages, setPages] = useState('');

  useEffect(() => {
    
    if (selectedBook && selectedBook.id) {
      setId(selectedBook.id);
      setTitle(selectedBook.title);
      setAuthor(selectedBook.author);
      setPages(selectedBook.pages);
    } else {
      
      setId(0);
      setTitle('');
      setAuthor('');
      setPages('');
    }
  }, [selectedBook]);

  const handleSave = () => {
    const newBook = {
      id,
      title,
      author,
      pages,
    };

    onSave(newBook);
  };

  return (
    <div>
      <h2>{selectedBook ? 'Editar Livro' : 'Adicionar Novo Livro'}</h2>
      <label>Título:</label>
      <input name="title" aria-label="Título" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <br />

      <label>Autor:</label>
      <input name="autor" aria-label="Autor" type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
      <br />

      <label>Páginas:</label>
      <input name="pages" aria-label="Páginas" type="text" value={pages} onChange={(e) => setPages(e.target.value)} />
      <br />

      <button onClick={handleSave}>Salvar</button>
      <button onClick={onCancel}>Cancelar</button>
    </div>
  );
};

export default AddEditBook;
