const mongoose = require('mongoose');

const coinSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    marketcap: {
        type: Number,
        required: true
    },
    price_change_24h: {
        type: Number,
        required: true
    },
    latestUpdate: {
        type: Date,
        required: true
    }
})

async function getCoinByName(name) {
    const coin = await Coin.exists({ name: name });
    if(coin) {
        const coinData = await Coin.findOne({ name: name }).sort({ latestUpdate: -1 }); 

        return {
            price: coinData.price,
            marketcap: coinData.marketcap,
            price_change_24h: coinData.price_change_24h,
        };
    }
    return null;
}


const Coin = mongoose.model('Coin', coinSchema);

module.exports = Coin;
module.exports.getCoinByName = getCoinByName;