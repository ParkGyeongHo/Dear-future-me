var mongoose = require('mongoose'),
    schema = mongoose.Schema;

var wordSchema = new schema({
    created : {
        type : date,
        default : Date.now()
    },
    title : {
        type : String,
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
        default : false
    }
});

mongoose.model('Words', wordSchema);
