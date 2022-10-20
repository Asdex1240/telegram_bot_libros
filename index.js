const telebot = require('telebot');
const CONSTANTS = require('./keys/constants');
const app = require('./keys/apikeyfirebase');
const { bookList, generoList, autoresList } = require('./firebase/firestore');

const bot = new telebot({
    token: CONSTANTS.telegram_token, // Required. Telegram Bot API token.
});

bot.on(["/start"], (msg) => {
    bot.sendMessage(msg.from.id, `Hola! ${msg.chat.username}, soy tu bot de libros.\n/help para ver los comandos.`);
});

bot.on(["/help"], (msg) => {
    bot.sendMessage(msg.from.id, 
    `/start: Inicia el bot.
\n/help: Muestra los comandos.
\n/buscar: Busca un libro por autor. \n/lista: Lista los libros. \n/generos: Lista los generos.`);
});

bot.on(["/generos"], (msg)=>{
    generoList(app.db).then((generos) =>{
        generos.forEach(genero =>{
            bot.sendMessage(msg.from.id, `${genero}` )
        })
    })
})

bot.on(["/autores"], (msg)=>{
    autoresList(app.db).then((autores) =>{
        autores.forEach(autor =>{
            bot.sendMessage(msg.from.id, `${autor}`)
        })
    })
})

bot.on(/^\/say (.+)$/, (msg, props) => {
    const text = props.match[1];
    const text2 = props.match[2];
    return bot.sendMessage(msg.from.id, text, text2,{ replyToMessage: msg.message_id });
});

bot.on(["/salir"], (msg)=>{
    bot.sendMessage(msg.from.id, "Desconectando")
    bot.stop()
})

bot.start();

