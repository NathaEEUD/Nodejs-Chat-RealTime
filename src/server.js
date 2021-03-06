const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const mongo = require('./libs/db-connection');
const indexRoutes = require('./routes/index');

const app = express();

const serverHTTP = require('http').Server(app);
const io = require('socket.io')(serverHTTP);

// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// routes
app.use('/', indexRoutes);

// socket
io.on('connection', () => {
    console.info('A user is connected!');
})

async function initDB() {
    const db = await mongo.connect();
    if (db) initServer();
}

function initServer() {
    const server = serverHTTP.listen(app.get('port'), () => {
        console.info(`Server is running on port`, server.address().port);
    })
    process.on('SIGINT', closeApp);
    process.on('SIGTERM', closeApp);
}

function closeApp() {
    mongo.disconnect();
}

initDB();