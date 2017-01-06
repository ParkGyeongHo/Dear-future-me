var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function () {
    var database = mongoose.connect(config.dataBaseURL);
    
    //mongoose로 정의한 model 적용
    require('../app/models/user.server.model.js');
    require('../app/models/words.server.model.js');
    return database;
};