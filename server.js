const express = require('express');
var app = express();

const { PORT } = require('./config');

app.use(express.static('resources'));

const server = app.listen(PORT, () => {
    console.info(`Server is running on port`, server.address().port);
});