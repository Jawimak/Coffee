const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const path = require('path')
const {Schema, Types} = require("mongoose");

const app = express()
const PORT = config.get('port') || 5000

app.use(express.json({extended: true}))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/course', require('./routes/course.routes'))
app.use('/api/role', require('./routes/role.routes'))
app.use('/api/mark', require('./routes/mark.routes'))

if(process.env.NODE_ENV === 'production'){
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

async function start(){
    try{
        await mongoose.connect(config.get('mongoUri'),{

        })
        app.listen(PORT, ()=> console.log(`App has been started at port ${PORT}`))

    } catch (e){
        console.log('Server error', e.message)
        process.exit(1)
    }
}


start()

