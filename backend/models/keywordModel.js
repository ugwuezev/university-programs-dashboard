
const mongoose = require('mongoose');

const keywordSchema = mongoose.Schema(
   
    {
        name: {
            type: String,
            required: true,
        }

    }
)

module.exports = mongoose.model('keyword', keywordSchema)