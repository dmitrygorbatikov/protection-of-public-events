const {Router} = require('express')
const router = Router()
const authController = require('../controllers/authController.js')

router.post('/register', authController.register)
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Регистрация
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       description: Body параметры для регистрации
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               name:
 *                 type: string
 *               surname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: Регистрация прошла успешно
 *       400:
 *         description: Что-то пошло не так
 */
router.post('/login', authController.login)

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Логин
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       description: Body параметры для логина
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Регистрация прошла успешно
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 token:
 *                   type: string
 *                   description: токен авторизации
 *                 userId:
 *                   type: string
 *                   description: id пользователя
 *               example:
 *                 token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTZiMDg3YzM5NmVlNDViZWIxZmI5OTkiLCJpYXQiOjE2MzQ0MDQ1MTN9.gPPTOuU51MT9MBdz49iOgyLhz1uVk4BR0Wbxv5J1oNA
 *                 userId: 616b087c396ee45beb1fb999
 *       400:
 *         description: Что-то пошло не так
 */

module.exports = router