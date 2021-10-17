const {Router} = require('express')
const router = Router()
const markController = require('../controllers/markController')
const authMiddleware = require('../middleware/auth.middleware')
const userMiddleware = require('../middleware/user.middleware')

router.get('/:securityId', authMiddleware, markController.getMark)

/**
 * @swagger
 * /mark/{securityId}:
 *   get:
 *     summary: Получение массива оценок и количества оценок
 *     tags: [Mark]
 *     parameters:
 *       - in: header
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: access_token
 *       - in: path
 *         name: securityId
 *         schema:
 *           type: string
 *         required: true
 *         description: securityId
 *     responses:
 *       200:
 *         description: Массив оценок службы охраны
 *       400:
 *         description: Что-то пошло не так
 *       401:
 *         description: Нет авторизации
 */

router.post('/', userMiddleware, markController.createMark)

/**
 * @swagger
 * /mark:
 *   post:
 *     summary: Добавление оценки
 *     tags: [Mark]
 *     parameters:
 *       - in: header
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: access_token
 *       - in: query
 *         name: securityId
 *         schema:
 *           type: string
 *         required: true
 *         description: securityId
 *     requestBody:
 *       required: true
 *       description: Body параметры для создания оценки
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               mark:
 *                 type: number
 *             example:
 *               mark: 10
 *     responses:
 *       200:
 *         description: Оценка
 *       400:
 *         description: Что-то пошло не так
 *       401:
 *         description: Нет авторизации
 */

module.exports = router