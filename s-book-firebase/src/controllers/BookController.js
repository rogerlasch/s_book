import { auth, db } from "../firebase.js";
import {getDocs, doc, addDoc, collection, query, onSnapshot, updateDoc, deleteDoc, where } from "firebase/firestore";

const COLLECTIONNAME="books";

class BookController{
async addBook(b){
    try {
const res=await addDoc(collection(db, COLLECTIONNAME), {
title:b.title,
author:b.author,
pages:parseInt(b.pages)
});

if(res!==null){
const result={id:res.id, title:b.title, author:b.author, pages:b.pages};
return {status:200, book:result};
}
else{
return {status:400,error:"Erro ao adicionar o livro:${JSON}.stringify(b)}"};
}

    }catch(err){
        console.log("Erro ao adicionar o livro.\n"+err);
        return {status:400,error:"Erro interno"};
    }
    }

    async deleteBook(id){
        try {
    const bRef=await doc(db, COLLECTIONNAME, id)
const res=    await deleteDoc(bRef);
return {status:200};
        }catch(err){
            console.log("Erro ao remover o livro.\n"+err);
            return {status:400,error:"Erro interno"};
        }
        }
    
        async updateBook(b){
            try {
const docRef=await doc(db, COLLECTIONNAME, b.id);
await updateDoc(docRef, {
    title:b.title,
author:b.author,
pages:b.pages});

return {status:200, book:b};
            }catch(err){
                console.log("Erro ao atualizar o livro.\n"+err);
                return {status:400,error:"Erro interno"};
            }
            }

            async getBooks(){
                try {
                    const q = query(collection(db, COLLECTIONNAME));
                    const querySnapshot = await getDocs(q);
            
                    const books = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        title: doc.data().title,
                        author: doc.data().author,
                        pages: doc.data().pages
                    }));
            
                    return {status:200,books:books};
                } catch (err) {
            console.log("Erro ao buscar livros:\n", err);
            return {status:400,error:"Erro ao buscar a lista de livros."};
                }
            };            
            }

export default BookController;