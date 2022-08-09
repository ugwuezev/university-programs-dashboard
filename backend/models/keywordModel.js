
const mongoose = require('mongoose');

const keywordSchema = mongoose.Schema(
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
    },
    {
        name: {
            type: String,
        }

    }
)

module.exports = mongoose.model('keyword', keywordSchema)