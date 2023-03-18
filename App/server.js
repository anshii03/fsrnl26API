var express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const path = require('path');

const dbConfigs = require(path.join(__dirname, "./config/db.config"));

mongoose.connect(dbConfigs.url)

var app = express();

app.use(cors());

var db = mongoose.connection;

db.on('error', () => {
    console.log('Unable to connect to database');
})

db.once('open', () => {
    console.log("Connection Successful");
})

app.use(bodyParser.json());

app.listen(process.env.PORT, () => {
    console.log(`Your server is running on port ${process.env.PORT}`);
})

require('./Routes/books.routes')(app);
require('./Routes/users.routes')(app);





