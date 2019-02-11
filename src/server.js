const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const mongo = require('./libs/db-connection');
const modelDB = require('./model/message');

const app = express();

// settings
app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'views')));

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

async function initDB() {
    const db = await modelDB();
    if (db) initServer();
}

function initServer() {
    const server = app.listen(app.get('port'), () => {
        console.info(`Server is running on port`, server.address().port);
    })
    process.on('SIGINT', closeApp);
    process.on('SIGTERM', closeApp);
}

function closeApp() {
    mongo.disconnect();
}

initDB();