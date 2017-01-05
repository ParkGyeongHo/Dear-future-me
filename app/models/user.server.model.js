var mongoose = require('mongoose'),
    schema = mongoose.Schema;

var userSchema = new schema({
    userid : String,
    username : String,
    password : String,
    birthday : Number,
    joinDate : {
        type: Date,
        default: Date.now()
    },
    email : String
});

mongoose.model('User', userSchema);