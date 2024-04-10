const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    id: {type: Number, required: false, unique:true},
    name: {type: String, required: true, unique: true}
})

module.exports = model('Role', schema)