const Event = require('../models/Event')
const User = require('../models/User')
const {Importance, Status, RequestStatus} = require("../enums");
const Request = require('../models/Request')
const {log} = require("nodemon/lib/utils");

class EventController{
    async createEvent(req,res){
        try{
            const {importance, amountOfPeople, date, time, city, linkWithDocument, description, numberOfGuards, price } = req.body
            let isNormalImportance = false

            for (let i = 0; i < Importance.length; i++) {
                if(Importance[i] === importance){
                    isNormalImportance = true
                    break
                }
            }
            if(isNaN(amountOfPeople) || !isNormalImportance){
                return res.status(400).json({error: "Invalid credentials"})
            }
            const event = new Event({
                importance,
                amountOfPeople,
                date,
                time,
                city,
                linkWithDocument,
                description,
                numberOfGuards,
                price,
                status: Status.pending,
                userId: req.user.userId,
                acceptedId: " ",
                createdDate: parseInt(Date.now().toString())
                })

            await event.save()
            return res.status(201).json(event)
        }
        catch (e) {
            return res.status(400).json({message:'Что-то пошло не так, попробуйте снова'})
        }
    }

    async getEventsByUser(req,res){
        try{
            const events = await Event.find({userId: req.user.userId})
            return res.status(200).json(events)
        }
        catch (e) {
            return res.status(400).json({message:'Что-то пошло не так, попробуйте снова'})
        }
    }
    async getEventById(req,res){
        try{
            const event = await Event.findOne({_id: req.params.id})
            return res.status(200).json(event)
        }
        catch (e) {
            return res.status(400).json({message:'Что-то пошло не так, попробуйте снова'})
        }
    }
    async getEventForSecurity(req,res){
        try{
            const events = await Event.find({  $or: [ { status: Status.pending }, { status: Status.requested } ]  })
            return res.status(200).json(events)
        }
        catch (e) {
            return res.status(400).json({message:'Что-то пошло не так, попробуйте снова'})
        }
    }
    async patchEventToRequestedStatus(req,res){
        try{
            const event = await Event.findById(req.params.id)
            if(!event){
                return res.status(400).json({error: "Мероприятие не найдено"})
            }
            if(event.status !== Status.approved){

                const candidateRequest = await Request.findOne({securityId: req.user.userId, eventId: req.params.id})
                if(candidateRequest){
                    return res.status(400).json({error: "Вы уже отправляли запрос на это мероприятие"})
                }

                const user = await User.findById(req.user.userId)

                const request = new Request({
                    securityId: req.user.userId,
                    eventId: event._id,
                    name: user.name,
                    surname: user.surname,
                    status: RequestStatus.pending,
                    createdDate: parseInt(Date.now().toString())
                })

                await request.save()

                event.status = Status.requested
                await event.save()

                return res.status(201).json(request)
            }
            else{
                return res.status(400).json({error: "Мероприятие уже приняло заказ"})
            }
        }
        catch (e) {
            return res.status(400).json({message:'Что-то пошло не так, попробуйте снова'})
        }
    }
}

module.exports = new EventController()