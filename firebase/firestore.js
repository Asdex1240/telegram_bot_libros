//App solo la usamos para efecto de pruebas :)
//const app = require('../keys/apikeyfirebase');
const { collection, getDocs,  } = require('firebase/firestore/lite');


//Buscar por medio de genero y autor
const bookList = async(db, genero, autor) => {
    const booksCol = collection(db, `biblioteca/${genero}/${autor}`);
    const bookSnapshot = await getDocs(booksCol);
    const bookList = bookSnapshot.docs.map(doc => doc.data());
    return bookList;
}
//Enlistar generos
const generoList = async(db) => {
    const querySnapshot = await getDocs(collection(db, "biblioteca"));
    const genList = querySnapshot.docs.map(doc => doc.id)
    return genList
}
//Enlistar autores

//Enlistar titulos



module.exports = {
    bookList, generoList
}

