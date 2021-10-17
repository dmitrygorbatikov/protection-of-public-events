const Mark = require('../models/Mark')
const Event = require('../models/Event')
const {Status} = require("../enums");
const {log} = require("nodemon/lib/utils");
class MarkController{
    async getMark(req,res){
        try{
            const marks = await Mark.find({securityId: req.params.securityId},{mark: 1, _id: 0}).lean()
            const arrayMarks = []
            for (let i = 0; i < marks.length; i++) {
                arrayMarks.push(marks[i].mark)
            }
            let sum = 0
            for (let i = 0; i < arrayMarks.length; i++) {
                sum+=arrayMarks[i]
            }
            const avg = sum/arrayMarks.length

            return res.status(200).json({avg, count: arrayMarks.length})
        }
        catch (e) {
            return res.status(400).json({message:'Что-то пошло не так, попробуйте снова'})
        }
    }
    async createMark(req,res){
        try{

            const event = await Event.findOne({acceptedId: req.query.securityId, status: Status.approved})
            if(!event){
                return res.status(400).json({error: "Одобрите хотя бы один заказ прежде чем поставить оценку"})
            }
            const candidateMark = await Mark.findOne({userId: req.user.userId, securityId: req.query.securityId})
            if(candidateMark){
                return res.status(400).json({error: "Вы уже ставили оценку на этой странице"})
            }
            if(req.body.mark > 10 || req.body.mark < 0){
                return res.status(400).json({error: "Неверная оценка"})
            }
            const mark = new Mark({
                securityId: req.query.securityId,
                userId: req.user.userId,
                mark: req.body.mark,
                createdDate: parseInt(Date.now().toString())
            })

            await mark.save()
            return res.status(201).json(mark)
        }
        catch (e) {
            return res.status(400).json({message:'Что-то пошло не так, попробуйте снова'})
        }
    }
}

module.exports = new MarkController()