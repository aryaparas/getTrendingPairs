// // // require('dotenv').config();
// // // const TelegramBot = require('node-telegram-bot-api');

// // // const token = process.env.BOT_TOKEN;
// // // const bot = new TelegramBot(token, { polling: true });

// // // const sendBotMessage = async () => {
// // //     try {
// // //         bot.on('message', (msg) => {
// // //             const chatId = msg.chat.id;
// // //             console.log("msg.chat.id",msg.chat.id)
// // //             bot.sendMessage(chatId, 'Hello, this is a message from your bot!');
// // //         });
// // //     } catch (error) {
// // //         console.log("Bot Error: ", error)
// // //     }
// // // }

// // // sendBotMessage();
// // // module.exports= {sendBotMessage};

// // require('dotenv').config();
// // const TelegramBot = require('node-telegram-bot-api');

// // const token = process.env.BOT_TOKEN;
// // const bot = new TelegramBot(token, { polling: true });



// // // Optional: You can listen for errors like this
// // bot.on('error', (error) => {
// //     console.log("Bot Error: ", error);
// // });


// import { config } from 'dotenv';
// import TelegramBot from 'node-telegram-bot-api';
// import fetchData from "./fetchData.js"; // Adjust the path as necessary

// config(); // Load environment variables

// const id = process.env.CHAT_ID;
// const token = process.env.BOT_TOKEN;
// const bot = new TelegramBot(token, { polling: false }); // Set polling to false if you're using webhooks

// // Function to send a message to a specific user
// bot.on('message', (msg) => {
//     const chatId = msg.chat.id;
//     console.log("msg.chat.id", msg.chat.id);
//     bot.sendMessage(chatId, 'Hello, this is a from your bot!');
// });
// export async function sendMessageToUser(chatId) {
//     console.log("id", id)
//     const data = await fetchData();
//     const message = `Data from API: ${JSON.stringify(data)}`;

//     bot.sendMessage(chatId, message);
// }

// bot.onText(/\/weather (.+)/, async (msg, match) => {
//     const chatId = msg.chat.id;
//     const location = match[1]; // Assuming the command is /weather <location>
//     const weatherData = await fetchDataFromAPI(location);
//     if (weatherData) {
//         bot.sendMessage(chatId, `The weather in ${location} is ${weatherData.weather}`);
//     } else {
//         bot.sendMessage(chatId, 'Could not fetch weather data.');
//     }
// });


// sendMessageToUser(id);

// // export {sendMessageToUser};
