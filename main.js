    const TelegramBot = require("node-telegram-bot-api");
    require("dotenv").config();
    const Cuybot = require("./app/Cuybot.js");

    const token = process.env.TELEGRAM_TOKEN;
    const OPTIONS = { polling: true };

    const cuyBot = new Cuybot(token, OPTIONS);

    const main = () => {
    cuyBot.getSticker();
    cuyBot.getGreeting();
    cuyBot.getFollow();
    cuyBot.getQuotes();
    cuyBot.getNews();
    cuyBot.getQuake();
    cuyBot.getHelp();
    }

    main();