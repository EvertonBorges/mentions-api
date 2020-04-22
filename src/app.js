// Tutorial: https://woliveiras.com.br/posts/construindo-uma-api-com-node-js-parte-1-criando-e-listando-dados/

const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
    useUnifiedTopology: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useCreateIndex: true 
});

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Mongoose default connection is open');
});

db.on('error', error => {
    console.log(`Mongoose default connection has occured \n${error}`);
});

db.on('disconnected', () => {
    console.log('Mongoose default connection is disconnected');
});

process.on('SIGINT', () => {
    db.close(() => {
        console.log('Mongoose default connection is disconnected due to application termination');

        process.exit(0);
    });
});

// Esta parte é importante para poder converter o body que vem nas requisições.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const Mentions = require('./models/mentions');

const indexRoutes = require('./routes/index-routes');
app.use('/', indexRoutes);

const mentionsRoutes = require('./routes/mentions-routes');
app.use('/mentions', mentionsRoutes);

module.exports = app;