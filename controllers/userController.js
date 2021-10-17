const User = require("../models/User.js");

class UserController{
    async profile(req,res){
        try{
            const user = await User.findOne({_id: req.user.userId},{ password: 0})
            if(!user){
                return res.status(400).json({error: "Пользователь не найден"})
            }
            return res.status(200).json(user)
        }
        catch (e) {
            return res.status(400).json({message:'Что-то пошло не так, попробуйте снова'})
        }
    }
    async updateProfile(req,res){
        try{
            const user = await User.findOne({_id: req.user.userId},{ password: 0})
            if(!user){
                return res.status(400).json({error: "Пользователь не найден"})
            }

            await User.findByIdAndUpdate(req.user.userId, req.body)
            return res.status(200).json({message: "Updated"})
        }
        catch (e) {
            return res.status(400).json({message:'Что-то пошло не так, попробуйте снова'})
        }
    }
}
module.exports = new UserController()