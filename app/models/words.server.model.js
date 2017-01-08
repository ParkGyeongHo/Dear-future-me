var mongoose = require('mongoose'),
    schema = mongoose.Schema;

var wordSchema = new schema({
    created : {
        type : Date,
        default : Date.now()
    },
    title : {
        type : String,
        default : '',
        trim : true,
        required : 'Title cannot be blank'
    },
    content : {
        type : String,
        default : '',
        trim : true
    },
    creator : {
        type : schema.ObjectId,
        ref : 'User'
    },
    visibility : {
        type : Boolean,
        default : false,
        trim : true
    }
});

mongoose.model('Word', wordSchema);
