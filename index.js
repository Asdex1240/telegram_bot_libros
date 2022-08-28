const telebot = require('telebot');
const CONSTANTS = require('./constants');

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