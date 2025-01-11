const Coin = require('../models/coins');
const axios = require('axios');
const mongoose = require('mongoose');
const calculateStandardDeviation = require('../util/mathUtil');


const COINS = ['bitcoin', 'matic-network', 'ethereum'];

const fetchPrices = async () => {
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${COINS.join()}`);
        const data = response.data;
        for (let i = 0; i < data.length; i++){
            const coin = data[i];
            const newCoin = new Coin({
                name: coin.id,
                price: coin.current_price,
                marketcap: coin.market_cap,
                price_change_24h: coin.price_change_24h,
                latestUpdate: new Date()
            });
            await newCoin.save();
        }
    }
    catch (error) {
        throw error;
    }
};

const getStanderdDeviation = async (name) => {
    const data = await Coin.find({ name: name }).sort({ latestUpdate: -1 }).limit(100);
    if(data.length == 0) {
        throw new Error("Coin not found");
    }
    const prices = data.map(coin => coin.price);
    return calculateStandardDeviation(prices);
}


module.exports = fetchPrices;
module.exports.getStanderdDeviation = getStanderdDeviation;