const {Router} = require('express')
const router = Router()
const requestController = require('../controllers/requestController')
const userMiddleware = require('../middleware/user.middleware')
const securityMiddleware = require('../middleware/security.middleware')

router.get('/security', securityMiddleware, requestController.getSecurityRequests)

/**
 * @swagger
 * /request/security:
 *   get:
 *     summary: Получение всех запросов службой охраны
 *     tags: [Request]
 *     parameters:
 *       - in: header
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: access_token
 *     responses:
 *       200:
 *         description: Список мероприятий службы охраны
 *       400:
 *         description: Что-то пошло не так
 *       401:
 *         description: Нет авторизации
 */

router.get('/user', userMiddleware, requestController.getUserEventRequests)

/**
 * @swagger
 * /request/user:
 *   get:
 *     summary: Получение всех запросов по мероприятию пользователем
 *     tags: [Request]
 *     parameters:
 *       - in: header
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: access_token
 *       - in: query
 *         name: eventId
 *         schema:
 *           type: string
 *         required: true
 *         description: eventId
 *     responses:
 *       200:
 *         description: Список мероприятий пользователя
 *       400:
 *         description: Что-то пошло не так
 *       401:
 *         description: Нет авторизации
 */

router.patch('/user', userMiddleware, requestController.rejectedRequest)

/**
 * @swagger
 * /request/user:
 *   patch:
 *     summary: Отклонить запрос
 *     tags: [Request]
 *     parameters:
 *       - in: header
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: access_token
 *       - in: query
 *         name: eventId
 *         schema:
 *           type: string
 *         required: true
 *         description: eventId
 *       - in: query
 *         name: requestId
 *         schema:
 *           type: string
 *         required: true
 *         description: requestId
 *     responses:
 *       200:
 *         description: Запрос отклонён
 *       400:
 *         description: Что-то пошло не так
 *       401:
 *         description: Нет авторизации
 */

router.patch('/user/:requestId', userMiddleware, requestController.adoptedRequest)

/**
 * @swagger
 * /request/user/{requestId}:
 *   patch:
 *     summary: Принять запрос
 *     tags: [Request]
 *     parameters:
 *       - in: header
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: access_token
 *       - in: path
 *         name: requestId
 *         schema:
 *           type: string
 *         required: true
 *         description: requestId
 *       - in: query
 *         name: eventId
 *         schema:
 *           type: string
 *         required: true
 *         description: eventId
 *     responses:
 *       200:
 *         description: Запрос принят
 *       400:
 *         description: Что-то пошло не так
 *       401:
 *         description: Нет авторизации
 */

router.delete('/:id', securityMiddleware, requestController.deleteRequest)

/**
 * @swagger
 * /request/{id}:
 *   delete:
 *     summary: Удалить запрос
 *     tags: [Request]
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
 *         description: requestId
 *     responses:
 *       200:
 *         description: Запрос удалён
 *       400:
 *         description: Что-то пошло не так
 *       401:
 *         description: Нет авторизации
 */

module.exports = router