//환경 구성 옵션
module.exports = {
    //sessionSecret 비밀문자열 설정
    sessionSecret : "thisissessionSecret",
    /**
     *  not local host URL - mongodb://username:password@hostname:port/database
     * */
    //dataBase(mongo) 주소 설정 - local
    dataBaseURL : 'mongodb://localhost/database'
};