//User model load
var user = require('mongoose').model('User'),
    passport = require('passport');

/**
 * 통합된 오류 메세지를 반환하는 비공개 메소드
 */
var getErrorMessage = function (err) {
    var message = '';
    //err.code = MongoDB error
    if (err.code){
        switch(err.code){
            case 11000:
            case 11001:
                message = 'UserID already exists';
                break;
            default:
                message = 'Something went Wrong';
        }
    }else{
        for (var errName in err.errors){
            if(err.errors[errName].message) message = err.errors[errName].message;
        }
    }
    return message;
};

//로그인
exports.renderSignin = function (req, res, next) {
    if(!req.user){
        res.render('signin', {
            title : 'Sign-in Form',
            messages : req.flash('error') || req.flash('info')
        });
    }else{
        // root로 이동
        return res.redirect('/');
    }
};

//가입
exports.renderSignup = function(req, res, next){
    if(!req.user){
        res.render('signup', {
            title : 'Sign-up Form',
            messages : req.flash('error')
        });
    }else{
        return res.redirect('/');
    }
};

exports.signup = function (req,res,next) {
    if(!req.user){
        //user 객체 생성
        var userData = new user(req.body);
        var message = null;

        userData.provider = 'local';

        //저장
        userData.save(function (err) {
            console.log('save');
            //에러가 생길 경우
            if(err){
                message = getErrorMessage(err);
                //임시로 오류 메세지 저장
                req.flash('error', message);
                return res.redirect('/signup');
            }
            //사용자 세션 생성
             req.login(userData, function (err) {
                    if(err) return next(err);
                    return res.redirect('/');
             });
        });
    }else{
        //root 로 이동
        return res.redirect('/');
    }
};

//인증된 session을 무효화
exports.signout = function (req, res) {
    req.logout();
    res.redirect('/');
};

exports.requiresLogin = function(req,res,next){
    if(!req.isAuthenticated()){
        return res.status(401).send({
            message : 'User is not logged in'
        });
    }
    next();
};

/*
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
};*/
