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

//모든 사용자를 찾는 메소드
exports.list = function(req, res, next){
    user.find(function (err, users) {
        if(err){
            return next(err);
        }else{
            res.json(users);
        }
    });
};

exports.read = function (req, res) {
    res.json(req.user);
};

//단일 사용자를 찾는 메소드
exports.userByID = function (req, res, next, id) {
    user.findOne({
        _id : id
    }, function (err, userData) {
        if(err){
            return next(err);
        }else{
            req.user = userData;
            next(); //read
        }
    })
};

exports.update = function (req, res, next) {
    user.findByIdAndUpdate(req.user.id, req.body, function (err, userData) {
        if(err){
            return next(err);
        }else{
            res.json(userData);
        }
    })
};

exports.delete = function (req, res, next) {
    req.user.remove(function (err) {
        if(err){
            return next(err);
        }else{
            res.json(req.user);
        }
    })
};
