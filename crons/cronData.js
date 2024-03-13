import fetch from 'node-fetch';
import { config } from 'dotenv';
import fetchData from "../fetchData.js";
import TelegramBot from 'node-telegram-bot-api';
import DataSchema from "../models/dataModel.js"

config();

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: false });
const groupChatId = process.env.CHAT_ID;

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}


const sendMessageToGroup = async (message) => {
    try {
        // message = JSON.stringify(message);
        await bot.sendMessage(groupChatId, message);
        console.log("message sent")
    } catch (error) {
        console.error('Error sending message:', error);
    }
};

async function updateOrInsert(obj) {
    try {

        const updateResult = await DataSchema.updateOne(
            { id: obj.id, category: obj.category }, // Find a document with the given id
            { $inc: { counter: 1 } } // Increment the counter by 1
        );

        const counter = await DataSchema.find({ id: obj.id, category: obj.category }, { _id: 0, counter: 1 });

        // If the document was not found (and thus not updated), insert it
        if (updateResult.modifiedCount === 0) {
            await DataSchema.updateOne(
                { id: obj.id, category: obj.category }, // Find a document with the given id
                {
                    $set: obj, // Set the price
                },
                { upsert: true } // If the document doesn't exist, insert it
            );
        };
        return [updateResult.modifiedCount, counter];
    } catch (error) {
        console.log("#38", error)
    }

}

export async function cronData() {
    try {
        const message = await fetchData();
        for (let x = 0; x < message.length; x++) {
            try {
                await sleep(3000)
                const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=' + message[x]["id"] + '&order=market_cap_desc&per_page=5&page=1&sparkline=false&locale=en');
                const data = await response.json();
                for (let y = 0; y < data.length; y++) {
                    let obj = {
                        category: message[x]["id"],
                        id: data[y].id,
                        link: "https://www.coingecko.com/en/coins/" + data[y].id,
                        symbol: data[y].symbol,
                        name: data[y].name,
                        counter: 1,
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
                    };

                    let xx = "category: " + obj.category + "\n*Counter:* " + obj.counter + "\nid: " + obj.id + "\nlink: " + obj.link + "\nsymbol: " + obj.symbol + "\nname: " + obj.name + "\ncurrent_price: " + obj.current_price + "\nmarket_cap: " + obj.market_cap + "\nfully_diluted_valuation: " + obj.fully_diluted_valuation + "\ntotal_volume: " + obj.total_volume + "\nhigh_24h: " + obj.high_24h + "\nlow_24h: " + obj.low_24h + "\nprice_change_24h: " + obj.price_change_24h + "\nprice_change_percentage_24h: " + obj.price_change_percentage_24h + "\nmarket_cap_change_24h: " + obj.market_cap_change_24h + "\nmarket_cap_change_percentage_24h: " + obj.market_cap_change_percentage_24h
                    const updateResult = await updateOrInsert(obj);
                    if (updateResult && updateResult[0] > 0) {
                        xx = "category: " + obj.category + "\nid: " + "\n*Counter:* " + updateResult[1] + obj.id + "\nlink: " + obj.link + "\nsymbol: " + obj.symbol + "\nname: " + obj.name + "\ncurrent_price: " + obj.current_price;
                    }
                    await sendMessageToGroup(xx);
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

// cronData()