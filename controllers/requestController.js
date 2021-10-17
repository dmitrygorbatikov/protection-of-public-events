const Request = require('../models/Request')
const Event = require('../models/Event')
const {Status, RequestStatus} = require("../enums");
class RequestController{
    async getSecurityRequests(req,res){
        try{
            const requests = await Request.find({securityId: req.user.userId})
            return res.status(200).json(requests)
        }
        catch (e) {
            return res.status(400).json({message:'Что-то пошло не так, попробуйте снова'})
        }
    }
    async getUserEventRequests(req,res){
        try{
            const requests = await Request.find({eventId: req.query.eventId, $or: [ { status: RequestStatus.pending }, { status: RequestStatus.adopted } ] })
            return res.status(200).json(requests)
        }
        catch (e) {
            return res.status(400).json({message:'Что-то пошло не так, попробуйте снова'})
        }
    }
    async rejectedRequest(req,res){
        try{
            const request = await Request.findById(req.query.requestId)
            if(!request){
                return res.status(400).json({error: "Запрос не найден"})
            }
            if(request.status === RequestStatus.pending) {
                const requestsCount = await Request.find({eventId: req.query.eventId, status: RequestStatus.pending}).count()
                if(requestsCount === 1){
                    const event = await Event.findById(req.query.eventId)
                    if(!event){
                        return res.status(400).json({error: "Мероприятие не найдено"})
                    }
                    event.status = Status.pending
                    await event.save()
                }
                request.status = RequestStatus.rejected
                await request.save()
                return res.status(200).json({message: "Запрос отклонён"})
            }
            return res.status(400).json({error: "Произошла ошибка"})
        }
        catch (e) {
            return res.status(400).json({message:'Что-то пошло не так, попробуйте снова'})
        }
    }
    async adoptedRequest(req,res){
        try{
            const request = await Request.findById(req.params.requestId)
            if(request.status === RequestStatus.pending) {
                request.status = RequestStatus.adopted
                await request.save()

                await Request.updateMany({
                    eventId: req.query.eventId,
                    status: RequestStatus.pending
                }, {$set: {status: RequestStatus.rejected}})

                const event = await Event.findById(req.query.eventId)
                if(!event){
                    return res.status(400).json({error: "Мероприятие не найдено"})
                }
                event.acceptedId = request.securityId
                event.status = Status.approved
                await event.save()
                return res.status(200).json({message: "Запрос принят"})
            }
            return res.status(400).json({error: "Произошла ошибка"})
        }
        catch (e) {
            return res.status(400).json({message:'Что-то пошло не так, попробуйте снова'})
        }
    }

    async deleteRequest(req,res){
        try{
            const request = await Request.findById(req.params.id)
            if (!request){
                return res.status(400).json({error: "Запрос не найден"})
            }
            if(request.status !== RequestStatus.pending){
                return res.status(400).json({error: "Вы можете удалить запрос только со статусом ожидания"})
            }
            if(request.securityId !== req.user.userId){
                return res.status(400).json({error: "У вас недостаточно прав"})
            }
            await Request.findByIdAndDelete(req.params.id)
            return res.status(200).json({message: "Запрос удалён"})
        }
        catch (e) {
            return res.status(400).json({message:'Что-то пошло не так, попробуйте снова'})
        }
    }

}
module.exports = new RequestController()