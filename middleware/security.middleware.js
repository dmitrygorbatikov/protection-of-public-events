const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')
const {Roles} = require("../enums");

module.exports = async (req, res, next) => {
    if(req.method === 'OPTIONS'){
        return next()
    }
    try{
        const token = req.headers.token

        if(!token){
            return res.status(401).json({message: 'Нет авторизации'})
        }

        req.user = jwt.verify(token, config.get('jwtSecret'))
        const user = await User.findOne({_id: req.user.userId})
        if(!user){
            return res.status(400).json({error: "Пользователь не найден"})
        }

        if(user.role !== Roles.security){
            return res.status(400).json({error: "У вас недостаточно прав"})
        }

        next()
    }
    catch (e) {
        res.status(401).json({message: 'Нет авторизации'})
    }
}