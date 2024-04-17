const {Router} = require('express')
const Course = require('../models/Course')
const User = require('../models/User')
const Question = require('../models/Question')
const router = Router()
const  auth = require('../middleware/auth.middleware')

router.post('/create_course', auth, async (req, res)=>{
    try{
        const {name, title, role, questions} = req.body

        const existing = await Course.findOne({name})

        if(existing){
            return res.json({course: existing})
        }

        const course = new Course({
            name, title, role, creator: req.user.userId
        })
        await course.save()

        if(questions.length > 0){
            for(let i = 0; i<questions.length; i++){
                const question = new Question({
                    courseId: course._id,
                    name: questions[i].name,
                    ans: questions[i].ans,
                    cor: questions[i].cor
                })
                await question.save()
            }
        }

        res.status(201).json({course})

    }catch(e){
        res.status(500).json({message: "Some error. Try more"})
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const { userId } = req.user;
        const user = await User.findById(userId);
        if (!user) throw new Error();
        const courses = await Course.find({role: user.role})
        res.json(courses);
    } catch(e) {
        res.status(500).json({ message: "Some error. Try again" });
    }
});

router.get('/:id', auth, async (req, res)=>{
    try{
        const course = await Course.findById(req.params.id) //??
        res.json(course)
    }catch(e){
        res.status(500).json({message: "Some error. Try more"})
    }
})

router.get('/get_questions/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const question = await Question.find({courseId: id});
        if(!question){
            return res.status(404).json({ message: "No questions found for this course." });
        }
        return res.json(question);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "An error occurred. Please try again." });
    }
})

module.exports = router