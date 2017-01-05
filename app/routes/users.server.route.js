//users controller load
var users = require('../controllers/users.server.controller');

module.exports = function (app) {
    //'post'형식으로 '/users'에 접근시 users controller create method 실행
    app.route('/users').post(users.create);
};

