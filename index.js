//const telebot = require('telebot');
//const CONSTANTS = require('./keys/constants');
const app = require('./keys/apikeyfirebase');
const db = require('./keys/apikeyfirebase');
const { bookList } = require('./firebase/firestore');
/*
const bot = new telebot({
    token: CONSTANTS.telegram_token, // Required. Telegram Bot API token.
});

bot.on(["/start"], (msg) => {
    bot.sendMessage(msg.from.id, `Hola! ${msg.chat.username}, soy tu bot de libros. \n /help para ver los comandos.`);
});

bot.on(["/help"], (msg) => {
    bot.sendMessage(msg.from.id, 
    `/start: Inicia el bot. \n
     /help: Muestra los comandos. \n
     /Buscar: Busca un libro. \n
     /lista: Lista los libros. \n
     /generos: Lista los generos.`);
});

bot.start();
*/

//console.log(db)
bookList(db.db).then((books) => {   
    books.forEach(book => {
        console.log(book.titulo);
        console.log(book.autor);
        console.log(book.url);
    });
});
