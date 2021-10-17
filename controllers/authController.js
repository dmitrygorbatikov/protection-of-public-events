const User = require('../models/User')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {Roles} = require("../enums");

class AuthController{
    async register(req,res){
        try {
            const candidate = await User.findOne( { email: req.body.email })
            if (candidate) {
                return res.json({message: 'Такой пользователь уже существует'})
            }

            const hashedPassword = await bcrypt.hash(req.body.password, 12)

            if(!req.body.email.includes('@') || !req.body.email.includes('.') || req.body.email.includes('@.')){
                return res.status(400).json({error: "Введите корректный email"})
            }

            const role = req.body.role
            if(role !== Roles.user && role !== Roles.security){
                return res.status(400).json({error: "Invalid role credentials"})
            }

            const user = new User({
                name: req.body.name,
                surname: req.body.surname,
                email: req.body.email,
                password: hashedPassword,
                role: req.body.role,
                registerDate: parseInt(Date.now().toString())
            })
            await user.save()
            return res.status(200).json({message: 'Пользователь создан!'})
        }
        catch (e) {
            return res.status(400).json({message: e.message})
        }
    }

    async login(req,res){
        try {
            const {email, password} = req.body

            const user = await User.findOne({email})

            if(!user){
                return res.status(400).json({message:'Пользователь не найден'})
            }
            const isMatch = await bcrypt.compare(password, user.password)

            if(!isMatch){
                return res.status(400).json({message:'Неверный пароль, попробуйте снова'})
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret')
            )
            return res.status(200).send({token, userId: user.id})
        }
        catch (e) {
            return res.status(400).json({message:'Что-то пошло не так, попробуйте снова'})
        }
    }
}

module.exports = new AuthController()