const mongoose = require('mongoose')
const Schema = mongoose.Schema
/*
    Stores a playlist comment
*/
const commentSchema = new Schema(
    {
        username: { type: String, required: true },
        body: { type: String, required: true }
    },
    { timestamps: true },
)

module.exports = mongoose.model('Comment', commentSchema)
