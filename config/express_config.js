var express = require('express'), //express module
    morgan = require('morgan'), //로거 미들웨어 제공
    compress = require('compression'), //응답 압축 지원
    bodyParser = require('body-parser'), //요청 데이터 처리
    methodOverride = require('method-override'), //DELETE, PUT 등과 같이 HTTP 동사 지원 기능
    config = require('./config'), //설정구성 js 파일
    session = require('express-session'), //express 세션 모듈
    passport = require('passport'),
    flash = require('connect-flash');

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

    //Session 설정
    app.use(session({
        saveUninitialized : true, //초기화되지 않은 세션정보 저장
        resave : true, //다시 저장
        secret : config.sessionSecret //비밀키 설정
    }));
    
    //ejs 템플릿
    app.set('views', './app/views');
    app.set('view engine', 'ejs');

    //passport
    app.use(passport.initialize()); //passport module을 초기화 시키고 구축해주는 module
    app.use(passport.session()); //사용자 session을 추적해주는 module

    //flash
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());

    //routing
    require('../app/routes/index.server.route.js')(app);
    require('../app/routes/users.server.route.js')(app);
    require('../app/routes/words.server.routes.js')(app);

    app.use(express.static('./static'));
    return app;
};