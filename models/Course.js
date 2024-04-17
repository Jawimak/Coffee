const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    name: {type: String, required: true},
    title: {type: String, required: true},
    date: {type: Date, default: Date.now},
    role: {type: Types.ObjectId, ref: 'Role' , required: true},
    creator: {type: Types.ObjectId, ref: 'User'},
    image: {type: String, default: "https://images.squarespace-cdn.com/content/v1/5515b9dfe4b0570dfe189823/1545621429972-UYQSWL0L4N04Z94YBSRS/Im.Coffee?format=2500w"}
})

module.exports = model('Course', schema)