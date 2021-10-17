const {Schema, model} = require('mongoose')

const schema = new Schema({
    importance: {
        type: String,
        required: true
    },
    amountOfPeople: {
        type: Number,
        required: true
    },
    date: {
        type: Number,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    linkWithDocument:{
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    numberOfGuards: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    acceptedId: {
        type: String,
        required: true,
        default: " "
    },
    createdDate: {
        type: Number,
        required: true
    }
})

module.exports = model('Event', schema)

/**
 * @swagger
 * components:
 *   schemas:
 *     Event:
 *       description: СОБЫТИЕ
 *       type: object
 *       required:
 *         - _id
 *         - importance
 *         - amountOfPeople
 *         - date
 *         - time
 *         - city
 *         - linkWithDocument
 *         - description
 *         - numberOfGuards
 *         - price
 *         - status
 *         - userId
 *         - acceptedId
 *         - createdDate
 *       properties:
 *         _id:
 *           type: string
 *           description: id события
 *         importance:
 *           type: string
 *           description: важность мероприятия
 *         amountOfPeople:
 *           type: string
 *           description: предполагаемое кол-во людей
 *         date:
 *           type: number
 *           description: дата проведения
 *         time:
 *           type: string
 *           description: временные рамки
 *         city:
 *           type: string
 *           description: город проведения
 *         linkWithDocument:
 *           type: string
 *           description: ссылка на документ, разрешающий проведение мероприятия
 *         description:
 *           type: string
 *           description: описание мероприятия
 *         numberOfGuards:
 *           type: number
 *           description: необходимое кол-во охранников
 *         price:
 *           type: number
 *           description: цена за охрану мероприятия
 *         status:
 *           type: string
 *           description: статус мероприятия
 *         userId:
 *           type: string
 *           description: id пользователя, который создал карточку мероприятия
 *         acceptedId:
 *           type: string
 *           description: id пользователя, который принял запрос на охрану
 *         createdDate:
 *           type: number
 *           description: дата создания карточки
 *       example:
 *         _id: 6165977bc70d6fc188334e00
 *         importance: medium
 *         amountOfPeople: 1000
 *         date: 1634048867560
 *         time: 15:00 - 20:00
 *         city: Харьков
 *         linkWithDocument: https://www.google.com/
 *         description: описание события
 *         numberOfGuards: 20
 *         price: 20000
 *         status: pending
 *         userId: 616b087c396ee45beb1fb999
 *         acceptedId: null
 *         createdDate: 1634048867560
 */