const http = require('http');
const express = require('express');
const { connectToDB } = require('./util/database');
const fetchPrices = require('./jobs/fetchPrices');
const { getStanderdDeviation } = require('./jobs/fetchPrices');
const { getCoinByName } = require('./models/coins');
require('dotenv').config();

const app = express();
const server = http.createServer(app)


app.get('/', (req, res) => {
    res.send('Hello World!');
});

setInterval(fetchPrices, 600000 * 6 * 2); // 

app.get('/stats/:coin', async (req, res) => {
    const coin = req.params.coin;
    const data = await getCoinByName(coin);
    if(data) {
        res.send(data);
    }
    else {
        res.send("Coin not found");
    }
})

app.get('/deviation/:coin', async (req, res) => {
    const coin = req.params.coin;
    try {
        const deviation = await getStanderdDeviation(coin);
        res.send({ deviation });
    }
    catch (error) {
        res.send(error.message);
    }
})

const main = async () => {
    try {
        await connectToDB();
        console.log("Connection Established")
        server.listen(3000);
    }
    catch (error) {
        throw error;
    }
}
main();