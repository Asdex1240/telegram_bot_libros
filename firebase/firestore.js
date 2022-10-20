//App solo la usamos para efecto de pruebas :)
const app = require('../keys/apikeyfirebase');
const { collection, getDocs } = require('firebase/firestore/lite');


//Buscar por medio de autor
const searchBook = async(autor, db) => {
    const x = generoList(db)
    return x
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

//Enlistar titulos
/*
module.exports = {
    bookList, generoList, autoresList
}
*/
