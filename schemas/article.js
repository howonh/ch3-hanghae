const mongoose = require("mongoose")

const articleSchema = new mongoose.Schema({
    articleId : {
        type : String,
        required : true,
        unique : true
    },
    title : {
        type : String,
        required : true
    },
    content : {
        type : String
    },
    Date : {
        type : Date,
        required : true
    },
    authorname : {
        type : String,
        required : true
    },
    articlePw : {
        type : String,
        required : true
    }
})


module.exports = mongoose.model("Article", articleSchema)