var mongoose = require('mongoose'),
    words = mongoose.model('Words');

var getErrorMessage = function (err) {
    if(err.errors){
        for(var errName in err.errors){
            if(err.errors[errName].message){
                return err.errors[errName].message;
            }
        }
    }else{
        return 'Unknown server error';
    }
};


exports.create = function (req, res) {
    //words 모델 인스턴스 생성
    var wordsData = new words(req.body);
    //인증된 패스포트 사용자를 추가
    wordsData.creator = req.user;

    //document save
    wordsData.save(function (err) {
        if(err){
            return res.status(400).send({
                message : getErrorMessage(err)
            });
        }else{
            res.json(wordsData);
        }
    })
};

exports.wordsList = function (req, res) {
    /**
     * find()메소드로 words document collections를 얻어온다.
     * sort()메소드로 created필드를 사용해 순서 정렬
     * populate()메소드로 words객체의 creator 속성에 username이라는 사용자 필드를 추가
     */
    words.find().sort('-created').populate('creator', 'username')
        .exec(function (err, wordsData) {
            if(err){
                return res.status(400).send({
                    message : getErrorMessage(err)
                });
            }else{
                res.json(wordsData);
            }
    })
};

exports.wordsByID = function (req, res, next, id) {
    words.findById(id).populate('creator', 'username')
        .exec(function (err, wordsData) {
            if(err){
                return next(err);
            }
            if(!wordsData){
                return (new Error('Failed to load wordsData' + id));
            }

            req.words = wordsData;
            next();
        });
};

exports.read = function (req, res) {
    res.json(req.words);
};

exports.update = function (req, res) {
    var wordsData = req.words;

    wordsData.title = req.body.title;
    wordsData.content = req.body.content;

    wordsData.save(function (err) {
        if(err){
            return res.status(400).send({
                message : getErrorMessage(err)
            })
        }else{
            res.json(wordsData);
        }
    })
};

exports.delete = function (req, res) {
    var wordsData = req.words;

    wordsData.remove(function (err) {
        if(err){
            return res.status(400).send({
                message : getErrorMessage(err)
            });
        }else{
            res.json(wordsData);
        }
    });
};

exports.hasAuthorization = function (req, res, next) {
    if(req.words.creator.id !== req.user.id){
        return res.status(403).send({
            message : 'User is not authorized'
        });
    }
    next();
};


