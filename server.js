const express = require('express');
const app = express();
const connectDB = require('./db');
const cron = require('node-cron');
const Data = require('./models/dataModel');
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

connectDB();

cron.schedule('*/30 * * * *', () => {
    console.log('Running every half hour');
    // Fetch details from MongoDB collection
    Data.find({}, (err, data) => {
        if (err) console.error(err);
        console.log('Fetched data:', data);
    });
});
