const {Schema, model} = require('mongoose')

const schema = new Schema({
    securityId: {
        type: String,
        required: true
    },
    eventId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    createdDate: {
        type: Number,
        required: true
    }
})

module.exports = model('Request', schema)

/**
 * @swagger
 * components:
 *   schemas:
 *     Request:
 *       description: ЗАПРОС
 *       type: object
 *       required:
 *         - _id
 *         - securityId
 *         - eventId
 *         - name
 *         - surname
 *         - status
 *         - createdDate
 *       properties:
 *         _id:
 *           type: string
 *           description: id запроса
 *         securityId:
 *           type: string
 *           description: id службы охраны
 *         eventId:
 *           type: string
 *           description: id мероприятия
 *         name:
 *           type: string
 *           description: имя пользователя
 *         surname:
 *           type: string
 *           description: фамилия пользователя
 *         status:
 *           type: string
 *           description: статус запроса
 *         createdDate:
 *           type: number
 *           description: дата создания запроса
 *       example:
 *         _id: 6165977bc70d6fc188334e00
 *         securityId: 6165977bc70d6fc188334e00
 *         eventId: 6165977bc70d6fc188334e00
 *         name: Anton
 *         surname: Surname
 *         status: pending
 *         createdDate: 194235913525
 */