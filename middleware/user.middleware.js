const jwt = require('jsonwebtoken')
const config = require('config')
const {Roles} = require("../enums");
const User = require("../models/User");

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
        const user = await User.findById(req.user.userId)
        if(!user){
            return res.status(400).json({error: "Пользователь не найден"})
        }

        if(user.role !== Roles.user){
            return res.status(400).json({error: "У вас недостаточно прав"})
        }
        next()

    }
    catch (e) {
        res.status(401).json({message: 'Нет авторизации'})
    }
}