const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mongo = require('../libs/db-connection');

module.exports = async function () {
    let Message = Schema({
        name: String,
        textMessage: String
    });

    const db = await mongo.connect();
    return db.model('message', Message);
}