var mongoose = require('mongoose'),
    schema = mongoose.Schema;

var userSchema = new schema({
    userid : {  //사용자 아이디
        type : String,
        trim : true,
        unique : true,
        required : 'Username is required'
    },
    username : String, //사용자 닉네임
    password : { //비밃번호
        type : String,
        validate : [
            function (password) {
                return password && password.length > 6;
            }, 'Password should be longer'
        ]
    },
    birthday : Number,  //사용자 생일
    joinDate : {    //가입 날짜
        type: Date,
        default: Date.now
    },
    email : String, //이메일
    salt : String,  //암호를 해시하기 위한 속성
    provider : {    //사용자 등록을 위해 사용되는 전략 지시 속성
        type : String,
        required : 'Provider is required'
    },
    providerId : String, //인증전략을 위해 사용자 식별자를 지시하는 속성
    providerData : {}   //OAuth공급자로 부터 인출한 사용자 객체를 저장하기 위한 속성
});

userSchema.pre('save', function (next) { //데이터 등록하기 전 pre 미들웨어를 먼저 실행
   if(this.password){ //password의 값이 있다면
       //가상 난수 해시 솔트 생성
       this.salt = new Buffer(cryto.randomBytes(16).toString('base64'),'base64');
       //암호화 된 패스워드로 치환
       this.password = this.hashPassword(this.password);
   }
   next();
});

userSchema.methods.hashPassword = function (password) { //암호화 하기 위해 사용
    //cryto 모듈을 활용해 비밀번호를 암호화 시킴
    return cryto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};

//문자열 인수를 받아들여 암호화하고 현재 사용자의 비밀번호와 비교
userSchema.methods.authenticate = function (password) {
    return this.password === this.hashPassword(password);
};

//새로운 사용자가 선택 가능한 유일한 이름을 찾기 위해 쓰이는 정적 메소드
userSchema.statics.findUniqueUserid = function (userid, suffix, callback) {
    var _this = this;
    var possibleUserid = userid + (suffix || '');

    _this.findOne({
        userid : possibleUserid
    }, function (err, user) {
        if(!err){
            if(!user){
                callback(possibleUserid);
            }else{
                return _this.findUniqueUserid(userid, (suffix || 0) + 1, callback);
            }
        }else{
            callback(null);
        }
    });
};

mongoose.model('User', userSchema);