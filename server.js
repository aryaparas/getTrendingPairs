import express from 'express';
import { config } from 'dotenv';
import cron from 'node-cron';
import { cronData } from './crons/cronData.js';
// import connectDB from './db.js';

config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// connectDB();
console.log(new Date().toLocaleString(),' :: Cron started');

// cronData();

cron.schedule('*/30 * * * *', async () => {
    console.log(new Date().toLocaleString(),' :: Cron job started');
    await cronData();
    console.log(new Date().toLocaleString(),' :: Messages sent to group every');
});