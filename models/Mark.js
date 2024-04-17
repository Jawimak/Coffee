const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    user: {type: Types.ObjectId, ref: 'User'},
    course: {type: Types.ObjectId, ref: 'Course'},
    val: {type: String, required: true},
    date: {type: Date, default: Date.now},
})

module.exports = model('Mark', schema)