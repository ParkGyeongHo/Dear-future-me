//환경 구성에 따라 다른 환경 파일을 require
module.exports = require('./env/' + process.env.NODE_ENV + '.js');