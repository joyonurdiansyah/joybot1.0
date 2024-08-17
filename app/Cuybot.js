    const TelegramBot = require("node-telegram-bot-api");
    const commands = require("../libs/commands.js");
    const { helpText, invalidCommand } = require("../libs/constant.js");

    class Cuybot extends TelegramBot {
    constructor(token, options) {
        super(token, options);
        this.on("message", (data) => {
        const isInCommand = Object.values(commands).some((keyword) =>
            keyword.test(data.text),
        );

        if (!isInCommand) {
            this.sendMessage(data.from.id, invalidCommand, {
            reply_markup: {
            inline_keyboard: [
                [
                {
                    text: "Panduan Pengguna",
                    callback_data: "go_to_help",
                    
                }
                ]
            ]
            }
        });
        }
        });
        this.on("callback_query", callback => {
        const callBackName = callback.data;

        if(callBackName === "go_to_help"){
            this.sendMessage(callback.from.id, helpText)
        }
        })
    }

    getSticker() {
        this.on("sticker", (data) => {
        this.sendMessage(data.chat.id, data.sticker.emoji);
        });
    }

    getGreeting() {
        this.onText(commands.greeting, (data) => {
        this.sendMessage(data.chat.id, "hallo juga Sayang ❤");
        });
    }

    getFollow() {
        this.onText(commands.follow, (data, after) => {
        this.sendMessage(data.from.id, `kata katamu: ${after[1]}`);
        });
    }

    getQuotes() {
        this.onText(commands.quote, async (data) => {
        const quoteEndpoint = "https://api.kanye.rest/";
        try {
            // ambil data quotes dari internet kak yang lain jangan dijadiin edit, non edit aja (yang copy paste jadi error wkwk)
            const apiCall = await fetch(quoteEndpoint);
            const { quote } = await apiCall.json();

            this.sendMessage(data.from.id, `quotes hari ini untuk kamu ${quote}`);
        } catch (err) {
            console.error(err);
            this.sendMessage(data.from.id, "maaf silahkan ulangi lagi 🙏");
        }
        });
    }

    getNews() {
        this.onText(commands.news, async (data) => {
        const newsEndpoint = "https://jakpost.vercel.app/api/category/indonesia";
        this.sendMessage(data.from.id, "mohon tunggu sebentar...");
        try {
            const apiCall = await fetch(newsEndpoint);
            const response = await apiCall.json();
            const maxNews = 4;

            for (let i = 0; i < maxNews; i++) {
            const news = response.posts[i];
            const { title, image, headline } = news;

            this.sendPhoto(data.from.id, image, {
                caption: `Judul : ${title}\n\n${headline}`,
            });
            }
        } catch (err) {
            console.error(err);
        }
        });
    }

        getQuake() {
        const quakeEndpoint = "https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json";
        try {
            this.onText(commands.quake, async (data) => {
                this.sendMessage(data.from.id, "mohon tunggu sebentar..."); // Pindahkan pesan tunggu ke sini
                const apiCall = await fetch(quakeEndpoint);
                const response = await apiCall.json();
                const { gempa } = response.Infogempa;
                const { Wilayah, Magnitude, Tanggal, Jam, Kedalaman, Shakemap } = gempa;

                const imgSourceUrl = `https://data.bmkg.go.id/DataMKG/TEWS/${Shakemap}`;

                this.sendPhoto(data.from.id, imgSourceUrl, {
                    caption: `Info gempa Terbaru ${Tanggal} / ${Jam} :\n\nWilayah: ${Wilayah}\nMagnitude: ${Magnitude} SR\nKedalaman: ${Kedalaman}`,
                });
            });
        } catch (err) {
            console.error(err);
        }
    }

    getHelp() {
        this.onText(commands.help, async (data) => {
        const botProfile = await this.getMe();
        this.sendMessage(data.from.id, helpText);
        });
    }
    }

    module.exports = Cuybot;
