import express from 'express';
import fetch from 'node-fetch';
import { config } from 'dotenv';
// import connectDB from './db.js';
// import { sendMessageToUser } from "./bot.js";
import cron from 'node-cron';
import Data from './models/dataModel.js';
import fetchData from "./fetchData.js";
import TelegramBot from 'node-telegram-bot-api';

config();

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: false });
const app = express();
const port = process.env.PORT || 3000;
const groupChatId = process.env.CHAT_ID;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// connectDB();

// Function to send a message to a specific group
const sendMessageToGroup = async (message) => {
    try {
        message = JSON.stringify(message);
        await bot.sendMessage(groupChatId, message);
    } catch (error) {
        console.error('Error sending message:', error);
    }
};

async function cronData () {
    try {
        const message = await fetchData();
        await sleep(2000)
        for (let x = 0; x < message.length; x++) {
            try {
                const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=' + message[x]["id"] + '&order=market_cap_desc&per_page=5&page=1&sparkline=false&locale=en');
                const data = await response.json();
                for (let y = 0; y < data.length; y++) {
                    let obj = {
                        category: message[x]["id"],
                        id: data[y].id,
                        link: "https://www.coingecko.com/en/coins/" + data[y].id,
                        symbol: data[y].symbol,
                        name: data[y].name,
                        current_price: data[y].current_price,
                        market_cap: data[y].market_cap,
                        fully_diluted_valuation: data[y].fully_diluted_valuation,
                        total_volume: data[y].total_volume,
                        high_24h: data[y].high_24h,
                        low_24h: data[y].low_24h,
                        price_change_24h: data[y].price_change_24h,
                        price_change_percentage_24h: data[y].price_change_percentage_24h,
                        market_cap_change_24h: data[y].market_cap_change_24h,
                        market_cap_change_percentage_24h: data[y].market_cap_change_percentage_24h,
                    }
                    await sendMessageToGroup(obj);
                    await sleep(5000)
                }
            } catch (error) {
                console.log("Error from cron(1st for): ", error)
            }
        }
    } catch (error) {
        console.log("Error from cron: ", error)
    }
}

cron.schedule('30 * * * *', async () => {
    console.log('cron job started');
    await cronData();
    console.log('Message sent to group every half hour');
});

const id = process.env.CHAT_ID;
