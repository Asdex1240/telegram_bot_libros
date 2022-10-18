const app = require('../keys/apikeyfirebase');

const { collection, getDocs } = require('firebase/firestore/lite');

const bookList = async(db) => {
    const booksCol = collection(db, 'biblioteca/Matematicas/Lehmann');
    const bookSnapshot = await getDocs(booksCol);
    const bookList = bookSnapshot.docs.map(doc => doc.data());
    return bookList;
}

module.exports = {
    bookList
}
