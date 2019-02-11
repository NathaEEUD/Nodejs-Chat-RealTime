const express = require('express');
const router = express.Router();
const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);

var model = null;

(async () => {
    model = await require('../model/message')();
})();

router.get('/', (req, res) => {
    res.render('index');
})

router.get('/messages', (req, res) => {
    model.find({}, (err, messages) => {
        res.send(messages);
    })
})

router.post('/messages', (req, res) => {
    let message = new model(req.body);
    message.save((err) => {
        if (err) sendStatus(500);
        io.emit('message', req.body);
        res.sendStatus(200);
    })
})

module.exports = router;