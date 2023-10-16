

const mongoose = require ("mongoose");

const todoSchema = mongoose.Schema(
    {
    text: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    },
 },
 {timestamp: true})


module.exports = mongoose.model(`todos`, todoSchema);