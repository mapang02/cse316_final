const mongoose = require('mongoose')
const Schema = mongoose.Schema
/*
    Used to keep track of what rating a user gave to a playlist
*/
const ratingSchema = new Schema(
    {
        ownerEmail: { type: String, required: true },
        rating: { type: String, required: true }
    },
    { timestamps: true },
)

module.exports = mongoose.model('Rating', ratingSchema)
