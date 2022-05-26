const mongoose = require("mongoose")

const connect = () => {
    mongoose.connect("mongodb+srv://test:sparta@cluster0.75ewr.mongodb.net/article_base?retryWrites=true&w=majority", { ignoreUndefined: true }).catch((err) => {
        console.error(err)
    })
}


module.exports = connect