const telebot = require('telebot');
const CONSTANTS = require('./keys/constants');
const app = require('./keys/apikeyfirebase');
const { bookList, generoList } = require('./firebase/firestore');

const bot = new telebot({
    token: CONSTANTS.telegram_token, // Required. Telegram Bot API token.
});

bot.on(["/start"], (msg) => {
    bot.sendMessage(msg.from.id, `Hola! ${msg.chat.username}, soy tu bot de libros.\n/help para ver los comandos.`);
});

bot.on(["/help"], (msg) => {
    bot.sendMessage(msg.from.id, 
    `/start: Inicia el bot. \n
     /help: Muestra los comandos. \n
     /buscar: Busca un libro por autor y genero. \n
     /lista: Lista los libros. \n
     /generos: Lista los generos.`);
});

bot.on(["/buscar"], (msg) =>{
    
    bot.sendMessage(msg.from.id, "¿Que genero de libro buscas?").then(() => {
        bot.on('text', (msg) => {
            const genero = msg.text;
            bot.sendMessage(msg.from.id, "¿Que autor buscas?").then(() => {
                bot.on('text', (msg) => {
                    const autor = msg.text;
                    bookList(app.db, genero, autor).then((books) =>{
                        books.forEach(book =>{
                            bot.sendMessage(msg.from.id,
                                `Nombre: ${book.titulo}\nAutor: ${book.autor}\n`            
                            )
                        })
                    })
                });
            });
        });
    }).catch(e => console.log(e));   

    
})

bot.on(["/generos"], (msg)=>{
    generoList(app.db).then((generos) =>{
        generos.forEach(genero =>{
            bot.sendMessage(msg.from.id, `${genero}` )
        })
    })
})

bot.on(/^\/say (.+)$/, (msg, props) => {
    const text = props.match[1];
    return bot.sendMessage(msg.from.id, text, { replyToMessage: msg.message_id });
});

bot.start();

