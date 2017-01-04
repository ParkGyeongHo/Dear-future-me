var express = require('express');

module.exports = function() {
    var app = express();
    require('../app/routes/index.server.route.js')(app);
    return app;
};