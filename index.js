const http = require('http');
const express = require('express');
const { connectToDB } = require('./util/database');
require('dotenv').config();

const app = express();
const server = http.createServer(app)


app.get('/', (req, res) => {
    res.send('Hello World!');
});


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