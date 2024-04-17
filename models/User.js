const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    cafe: {type: Types.ObjectId, ref: 'Cafe'},
    role: {type: Types.ObjectId, ref: 'Role', default: "66167fa57154deca31392ad3"},
})

module.exports = model('User', schema)