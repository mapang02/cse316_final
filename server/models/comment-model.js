const mongoose = require('mongoose')
const Schema = mongoose.Schema
/*
    Used to keep track of what rating a user gave to a playlist
*/
const commentSchema = new Schema(
    {
        username: { type: String, required: true },
        body: { type: String, required: true }
    },
    { timestamps: true },
)

module.exports = mongoose.model('Comment', commentSchema)
