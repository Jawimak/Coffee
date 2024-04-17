const {Router} = require('express')
const Role = require('../models/Role')
const router = Router()
const  auth = require('../middleware/auth.middleware')

router.get('/get', auth, async (req, res)=>{
    try{
        const roles = await Role.find()
        res.json(roles)
    }catch(e){
        res.status(500).json({message: "Some error. Try more"})
    }
})

router.get('/:id', auth, async (req, res)=>{
    try{
        const role = await Role.findById(req.params.id) //??
        res.json(role)
    }catch(e){
        res.status(500).json({message: "Some error. Try more"})
    }
})

module.exports = router