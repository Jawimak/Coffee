const {Router} = require('express')
const CourseLevel = require('../models/CourseLevel')
const router = Router()
const  auth = require('../middleware/auth.middleware')

router.get('/', auth, async (req, res)=>{
    try{
        const levels = await CourseLevel.find()
        res.json(levels)
    }catch(e){
        res.status(500).json({message: "Some error. Try more"})
    }
})

module.exports = router