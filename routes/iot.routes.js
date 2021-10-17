const {Router} = require('express')
const router = Router()
const authMiddleware = require('../middleware/auth.middleware')
const iotController = require('../controllers/iotController')

router.get('/', authMiddleware, iotController.getIotData)

/**
 * @swagger
 * /iot:
 *   get:
 *     summary: Получение датчиков опасности с камер
 *     tags: [Iot]
 *     parameters:
 *       - in: header
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: access_token
 *     responses:
 *       200:
 *         description: Данные с датчиков, где false - опасности нет, true - есть опасность и потребуется охрана в данном секторе
 *       400:
 *         description: Что-то пошло не так
 *       401:
 *         description: Нет авторизации
 */

module.exports = router