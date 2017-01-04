var express = require('express'),
    morgan = require('morgan'), //로거 미들웨어 제공
    compress = require('compression'), //응답 압축 지원
    bodyParser = require('body-parser'), //요청 데이터 처리
    methodOverride = require('method-override'); //DELETE, PUT 등과 같이 HTTP 동사 지원 기능

module.exports = function() {
    var app = express();

    //NODE_ENV 환경변수의 값이 development일 경우
    if(process.env.NODE_ENV === 'development'){
        app.use(morgan('dev'));

    //NODE_ENV 환경변수의 값이 production일 경우
    }else if(process.env.NODE_ENV === 'production'){
        app.use(compress());
    }

    app.use(bodyParser.urlencoded({
        extended : true
    }));

    //미들웨어 사용
    app.use(bodyParser.json());
    app.use(methodOverride());

    app.set('views', './app/views');
    app.set('view engine', 'ejs');

    require('../app/routes/index.server.route.js')(app);
    return app;
};