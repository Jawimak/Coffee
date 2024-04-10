const {Router} = require('express')
const Course = require('../models/Course')
const {validationResult} = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const router = Router()
const  auth = require('../middleware/auth.middleware')
const config = require('config')

router.post('/create_course', auth, async (req, res)=>{
    try{
        const {name, title, level} = req.body

        const existing = await Course.findOne({name})

        if(existing){
            return res.json({course: existing})
        }

        const course = new Course({
            name, title, level, creator: req.user.userId
        })

        await course.save()

        res.status(201).json({course})

    }catch(e){
        res.status(500).json({message: "Some error. Try more"})
    }
})

router.get('/', auth, async (req, res)=>{
    try{
        const courses = await Course.find()
        res.json(courses)
    }catch(e){
        res.status(500).json({message: "Some error. Try more"})
    }
})

router.get('/:id', auth, async (req, res)=>{
    try{
        const course = await Course.findById(req.params.id) //??
        res.json(course)
    }catch(e){
        res.status(500).json({message: "Some error. Try more"})
    }
})

module.exports = router