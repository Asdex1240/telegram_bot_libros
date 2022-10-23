const telebot = require('telebot');
const CONSTANTS = require('./keys/constants');
const app = require('./keys/apikeyfirebase');
const { generoList, autoresList, search, searchByGenero } = require('./firebase/firestore');

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
\n/autores: Lista los autores 
\n/generos: Lista los generos.
\n/buscarautor: Busca un libro por autor.   /buscarautor "Escribe autor" 
\n/buscargenero: Busca un libro por genero. /buscargenero "Escribe genero"
`);
});

bot.on(["/autores"], (msg)=>{
    autoresList(app.db).then((autores) =>{
        autores.forEach(autor =>{
            bot.sendMessage(msg.from.id, `${autor}`)
        })
    })
})

bot.on(["/generos"], (msg)=>{
    generoList(app.db).then((generos) =>{
        generos.forEach(genero =>{
            bot.sendMessage(msg.from.id, `${genero}` )
        })
    })
})


bot.on(/^\/buscarautor (.+)$/,async (msg, props) =>{
    const autor = props.match[1];
    const librosArray = await search(app.db, autor)
    if(librosArray.length != 0){
        librosArray.forEach(libro => {
            return bot.sendMessage(msg.from.id, 
                `Nombre: ${libro.titulo}\nGenero: ${libro.genero}\nEnlace: ${libro.url}`)
        })
    }else{
        return bot.sendMessage(msg.from.id, "No hay coincidencias")
    }
})

bot.on(/^\/buscargenero (.+)$/,async (msg, props) =>{
    const genero = props.match[1];
    const librosArray = await searchByGenero(app.db, genero)
    if(librosArray.length != 0){
        librosArray.forEach(libro => {
            return bot.sendMessage(msg.from.id, 
                `Nombre: ${libro.titulo}\nAutor: ${libro.autor}\nEnlace: ${libro.url}`)
        })
    }else{
        return bot.sendMessage(msg.from.id, "No hay coincidencias")
    }
})

bot.start();

