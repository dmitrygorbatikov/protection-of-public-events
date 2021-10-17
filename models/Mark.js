const {Schema, model} = require('mongoose')

const schema = new Schema({
    securityId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    mark: {
        type: Number,
        required: true
    },
    createdDate: {
        type: Number,
        required: true
    }
})

module.exports = model('Mark', schema)

/**
 * @swagger
 * components:
 *   schemas:
 *     Mark:
 *       description: ОЦЕНКА
 *       type: object
 *       required:
 *         - _id
 *         - securityId
 *         - userId
 *         - mark
 *         - createdDate
 *       properties:
 *         _id:
 *           type: string
 *           description: id оценки
 *         securityId:
 *           type: string
 *           description: id службы охраны
 *         userId:
 *           type: string
 *           description: id пользователя
 *         mark:
 *           type: number
 *           description: оценка
 *         createdDate:
 *           type: number
 *           description: дата создания оценки
 *       example:
 *         _id: 6165977bc70d6fc188334e00
 *         securityId: 6165977bc70d6fc188334e00
 *         userId: 6165977bc70d6fc188334e00
 *         mark: 10
 *         createdDate: 194235913525
 */