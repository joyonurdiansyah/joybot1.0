const TelegramBot = require("node-telegram-bot-api");
require('dotenv').config();

const token = process.env.TELEGRAM_TOKEN
const bot = new TelegramBot(token, { polling: true });

// ini listener untuk semua message
bot.on("message", async ( data ) => {
if(data.text == "halo") {
    const botProfile = await bot.getMe()
    bot.sendMessage(data.from.id, `Hallo perkenalkan saya adalah ${botProfile.first_name}!\nada yang bisa saya bantu?`)
}
})

// ini listener untuk message specific sticker only
bot.on("sticker", data => {
    bot.sendMessage(data.from.id, data.sticker.emoji)
})

// spesifik hanya user ketik !halo
bot.onText(/^!halo$/, data => {
bot.sendMessage(data.from.id, "Hallo juga sayang ❤")
})

// ketika user ketik !follow testing, maka kata2 testing akan ditangkap
bot.onText(/^!follow(.+)/, (data, after) => {
console.log(after[1])
bot.sendMessage(data.from.id, `kata katamu: ${after[1]}`)
})

bot.onText(/!^quote$/, async ( data )=> {
const quoteEndpoint = "https://api.kanye.rest/"
try{
    // ambil data quotes dari internet
    const apiCall = await fetch(quoteEndpoint)
    const { quote } = await apiCall.json()

    bot.sendMessage(data.from.id, `quotes hari ini untuk kamu ${quote}`)
} catch(err){
    console.error(err)
    bot.sendMessage(data.from.id, "maaf silahkan ulangi lagi 🙏")
}
})

bot.onText(/!news/, async ( data )=> {
const newsEndpoint = "https://jakpost.vercel.app/api/category/indonesia"
bot.sendMessage(data.from.id, "mohon tunggu sebentar...")
try{
    const apiCall = await fetch(newsEndpoint);
    const response = await apiCall.json();
    const maxNews = 2;
    
    for(let i = 0; i < maxNews; i++){
    const news = response.posts[i];
    const { title, image, headline } = news;

    bot.sendPhoto(data.from.id, image, { caption: `Judul : ${title}\n\n${headline}` })
    }
}catch(err){
    console.error(err);
}
})