var passport = require('passport'),
    localStrategy = require('passport-local').Strategy,
    user = require('mongoose').model('User');

module.exports = function () {
    //LocalStrategy 객체 등록
    passport.use(new localStrategy(function (userId, password, done) {
        user.findOne({
            userid : userId
        }, function (err, userData) {
            if(err){
                return done(err);
            }
            //일치하는 유저가 없다면(user의 값이 없다면)
            if(!user){
                return done(null, false, {
                    message : 'Unknown user'
                });
            }
            //패스워드를 비교해서 틀리다면
            if(!user.authenticate(password)){
                return done(null, false, {
                    message : 'Invalid password'
                });
            }
            return done(null, userData);
        });
    }));
};
