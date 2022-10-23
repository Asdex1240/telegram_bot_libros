//App solo la usamos para efecto de pruebas :)
//const app = require('../keys/apikeyfirebase');
const { collection, getDocs, getDoc, query, collectionGroup, doc } = require('firebase/firestore/lite');

//Buscar por medio de autor
async function search(db, autor){
    const genList = await generoList(db)   
    let i = 0
    let j = 0
    let allBooksArray = []
    for(i=0; i<genList.length; i++){
        genListArray = await bookList(db, genList[i], autor)
        for(j=0; j<genListArray.length; j++){
            allBooksArray.push(genListArray[j])
        }      
    }
    return allBooksArray
}

//Buscar por medio de genero
async function searchByGenero(db, genero){
    const autores = await autoresList(db)
    let librosList = []
    let i = 0
    let j = 0
    for(i; i<autores.length; i++){
        let bookListA = await bookList(db, genero, autores[i])
        for(j=0; j<bookListA.length; j++){
            librosList.push(bookListA[j])
        }   
    }
    return librosList
}

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

module.exports = {
    bookList, generoList, autoresList, search, searchByGenero
}

