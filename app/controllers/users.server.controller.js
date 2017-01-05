//User model load
var user = require('mongoose').model('User');

exports.create = function (req, res, next) {
    //user 인스턴스(document)생성 - req.body
    var userDocument = new user(req.body);

    //monogoDB에 저장
    userDocument.save(function (err) {
        //오류가 날경우
        if (err) {
            //다음 미들웨어로 오류를 넘긴다.
            return next(err);
        } else {
            //json방식으로 user를 응답
            res.json(userDocument);
        }
    });
};