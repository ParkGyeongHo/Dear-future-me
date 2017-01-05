//users controller load
var users = require('../controllers/users.server.controller');

module.exports = function (app) {
    /**
     * 'post'방식으로 '/users'에 접근시 users controller create method 실행
     * 'get'방식으로 '/users'에 접근시 users controller list method 실행
     * */
    app.route('/users')
        .post(users.create)
        .get(users.list);

    /**
     * 'get'방식으로 '/users/:userId'에 접근시 users read method 실행
     * 'put'방식으로 '/users/:userId'에 접근시 users update method 실행
     * */
    app.route('/users/:userId')
        .get(users.read)
        .put(users.update)
        .delete(users.delete);

    /**
     * 다른 라우팅 미들웨어를 수행하기 전 userId를 이용하여 userByID를 먼저 실행
     * */
    app.param('userId', users.userByID);
};

