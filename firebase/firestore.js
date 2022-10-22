//App solo la usamos para efecto de pruebas :)
const app = require('../keys/apikeyfirebase');
const { collection, getDocs } = require('firebase/firestore/lite');

//Buscar por medio de autor
async function search(db){
    const genList = await generoList(db)   
    let y = []
    let x
    genList.forEach(async gen =>{
        x = await bookList(db, gen, 'Desconocido')
        console.log(x)
    })
}

/*const searchBook = async(db) => {

}*/

const bookList = async(db, genero, autor) => {
    let path = `biblioteca/${genero}/${autor}`
    const booksCol = collection(db, path);
    const bookSnapshot = await getDocs(booksCol);
    let bookList = bookSnapshot.docs.map(doc => doc.data());
    return bookList
}

//Enlistar generos
const generoList = async(db) =>{
    const querySnapshot = await getDocs(collection(db, "biblioteca"));
    const generoList = querySnapshot.docs.map(doc => doc.id)
    return generoList
}

//Enlistar autores
const autoresList = async(db) =>{
    const querySnapshot = await getDocs(collection(db, "autores"));
    const autorList = querySnapshot.docs.map(doc => doc.id)
    return autorList
}

search(app.db)

/*
module.exports = {
    bookList, generoList, autoresList, searchBook
}
*/