var mongoose = require('mongoose'),
    schema = mongoose.Schema;

var userSchema = new schema({
    userid : {
        type : String,
        trim : true
    },
    username : String,
    password : String,
    birthday : Number,
    joinDate : {
        type: Date,
        default: Date.now
    },
    email : String
});

mongoose.model('User', userSchema);