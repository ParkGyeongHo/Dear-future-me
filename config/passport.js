var passport = require('passport'),
    mongoose = require('mongoose');

module.exports = function () {
    var user = mongoose.model('User');

    //serializeUser()와 deserializeUser 메소드는 passport 모듈이 사용자 직렬화를 다루는 방식을 정의하기 위해 사용
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findOne({
            _id : id
        }, '-password -salt', function (err, user) {
            done(err, user);
        });
    });
    require('./strategies/local.js')();
};
