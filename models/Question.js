const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    courseId: {type: Types.ObjectId, required: true, ref: 'Course'},
    name: {type: String, required: true},
    ans: [{type: String, required: true}],
    cor: {type: String, required: true}
})


module.exports = model('Question', schema)


