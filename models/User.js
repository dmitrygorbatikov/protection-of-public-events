const {Schema, model} = require('mongoose')

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true,
    },
    registerDate: {
        type: Number,
        required: true
    }
})

module.exports = model('User', schema)

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       description: ПОЛЬЗОВАТЕЛЬ
 *       type: object
 *       required:
 *         - _id
 *         - name
 *         - surname
 *         - email
 *         - password
 *         - role
 *         - registerDate
 *       properties:
 *         _id:
 *           type: string
 *           description: id пользователя
 *         name:
 *           type: string
 *           description: имя пользователя
 *         surname:
 *           type: string
 *           description: фамилия пользователя
 *         email:
 *           type: string
 *           description: email
 *         password:
 *           type: string
 *           description: пароль
 *         role:
 *           type: string
 *           description: роль пользователя
 *         registerDate:
 *           type: number
 *           description: дата регистрации пользователя
 *       example:
 *         _id: 6165977bc70d6fc188334e00
 *         name: Anton
 *         surname: Surname
 *         email: anton@gmail.com
 *         password: $2a$12$j/SqK.hzPyvCdt75zqMax.e6uqN51n8ZvsFOQcMw0og/xhVjzwGI2
 *         role: user
 *         registerDate: 1634047867560
 */