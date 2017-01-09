//users controller load
var users = require('../controllers/users.server.controller'),
    passport = require('passport');

module.exports = function (app) {
    /**
     * 'post'방식으로 '/signup'에 접근시 users controller signup method 실행
     * 'get'방식으로 '/signup'에 접근시 users controller renderSignup method 실행
     * */
    app.route('/signup')
        .post(users.signup)
        .get(users.renderSignup);

    /**
     * 'get'방식으로 '/signin'에 접근시 users renderSignin method 실행
     * 'post'방식으로 '/signin'에 접근시 passport authenticate method 실행
     * */
    app.route('/signin')
        .get(users.renderSignin)
        .post(passport.authenticate('local', {
            successRedirect : '/',  //성공적으로 인증한 다음 요청을 전환할 위치를 지정.
            failureRedirect : '/signin', // 사용자가 인증에 살해한 다음에 요청을 전환할 위치를 지정
            failureFlash : true // flash 사용 여부
        }));
    app.get('/signout', users.signout);

    app.route('/user/:id')
        .get(users.mypage)
        .post(users.update, users.mypage);
};

