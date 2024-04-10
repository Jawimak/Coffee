const {Router} = require('express')
const router = Router()
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')


// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Incorrect password')
            .isLength({min: 6})
    ],
    async (req, res) => {
    try{

        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect registration data'
            })
        }
        const {email, password} = req.body

        const candidate = await User.findOne({email})

        if (candidate)
        {
            return res.status(400).json({message: 'user with that email is already registered'})
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({email, password: hashedPassword})

        await user.save()

        res.status(201).json({message: 'User registered successfully'})


    }catch(e){
        res.status(500).json({message: "Some error. Try more"})
    }
})

// /api/auth/login
router.post(
    '/login',
    [
      check('email', 'Write correct email').normalizeEmail().isEmail(),
        check('password', 'Write password').exists()
    ],
    async (req, res) => {
    try{

        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect login data'
            })
        }

        const {email, password} = req.body

        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({message: 'Unknown user'})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({message: 'Invalid password, try again'})
        }

        const token = jwt.sign(
            {userId: user.id},
            config.get('jwtSecret'),
            {expiresIn: "1h"}
        )

        res.json({token, userId: user.id})


    }catch(e){
        res.status(500).json({message: "Some error. Try more"})
    }
})



module.exports = router

