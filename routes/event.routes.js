const {Router} = require('express')
const router = Router()
const eventController = require('../controllers/eventController')
const authMiddleware = require('../middleware/auth.middleware')
const userMiddleware = require('../middleware/user.middleware')
const securityMiddleware = require('../middleware/security.middleware')

router.post('/', userMiddleware, eventController.createEvent)

/**
 * @swagger
 * /event:
 *   post:
 *     summary: Создание карточки мероприятия
 *     tags: [Event]
 *     parameters:
 *       - in: header
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: access_token
 *     requestBody:
 *       required: true
 *       description: Body параметры для создания мероприятия
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               importance:
 *                 type: string
 *               amountOfPeople:
 *                 type: number
 *               date:
 *                 type: number
 *               time:
 *                 type: string
 *               city:
 *                 type: string
 *               linkWithDocument:
 *                 type: string
 *               description:
 *                 type: string
 *               numberOfGuards:
 *                 type: number
 *               price:
 *                 type: number
 *             example:
 *               importance: medium
 *               amountOfPeople: 1000
 *               date: 1634048867560
 *               time: 15:00 - 20:00
 *               city: Харьков
 *               linkWithDocument: https://www.google.com/
 *               description: описание события
 *               numberOfGuards: 20
 *               acceptedId: null
 *               price: 20000
 *     responses:
 *       200:
 *         description: Карточка создана
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       400:
 *         description: Что-то пошло не так
 *       401:
 *         description: Нет авторизации
 */

router.patch('/request/:id', securityMiddleware, eventController.patchEventToRequestedStatus)

/**
 * @swagger
 * /event/request/{id}:
 *   patch:
 *     summary: Отправление запрос службой охраны
 *     tags: [Event]
 *     parameters:
 *       - in: header
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: access_token
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id мероприятия
 *     responses:
 *       200:
 *         description: Запрос отправлен
 *       400:
 *         description: Что-то пошло не так
 *       401:
 *         description: Нет авторизации
 */

router.get('/', userMiddleware, eventController.getEventsByUser)

/**
 * @swagger
 * /event:
 *   get:
 *     summary: Получение созданных мероприятий пользователем
 *     tags: [Event]
 *     parameters:
 *       - in: header
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: access_token
 *     responses:
 *       200:
 *         description: Запрос отправлен
 *       400:
 *         description: Что-то пошло не так
 *       401:
 *         description: Нет авторизации
 */

router.get('/:id', authMiddleware, eventController.getEventById)

/**
 * @swagger
 * /event/{id}:
 *   get:
 *     summary: Получение мероприятия по id
 *     tags: [Event]
 *     parameters:
 *       - in: header
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: access_token
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id мероприятия
 *     responses:
 *       200:
 *         description: Данные мероприятия
 *       400:
 *         description: Что-то пошло не так
 *       401:
 *         description: Нет авторизации
 */

router.get('/security/list', securityMiddleware, eventController.getEventForSecurity)

/**
 * @swagger
 * /event/security/list:
 *   get:
 *     summary: Получение мероприятий службой охраны
 *     tags: [Event]
 *     parameters:
 *       - in: header
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: access_token
 *     responses:
 *       200:
 *         description: Список мероприятий
 *       400:
 *         description: Что-то пошло не так
 *       401:
 *         description: Нет авторизации
 */

module.exports = router