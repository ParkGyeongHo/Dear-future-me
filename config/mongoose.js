var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function () {
    var database = mongoose.connect(config.dataBaseURL);

    return database;
};