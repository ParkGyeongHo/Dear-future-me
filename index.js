//NODE_ENV 환경변수 설정(환경변수가 설정되지 않았을 경우 development로 설정)
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('./config/express_config');

var app = express();
app.listen(3000);
module.exports = app;

console.log('Server running at localhost');