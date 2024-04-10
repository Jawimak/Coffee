const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    name: {type: String, required: true},
    title: {type: String, required: true},
    date: {type: Date, default: Date.now},
    level: {type: String , required: true},
    creator: {type: Types.ObjectId, ref: 'Worker'}
})

module.exports = model('Course', schema)