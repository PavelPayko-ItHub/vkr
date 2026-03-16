const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
const pointsController = require('../controllers/pointsController')

const { verifyUserToken, isAdmin } = require('../middleware/auth')

router.get('/auth_me', verifyUserToken, authController.auth_me)

router.post('/login', authController.login)
router.get('/createAdmin', userController.createAdmin)

router.get('/users', verifyUserToken, userController.getUsers)
router.post('/users', userController.createUser)
router.put('/users/:id', verifyUserToken, isAdmin, userController.updateUser)
router.delete('/users/:id', verifyUserToken, isAdmin, userController.deleteUser)
router.get('/users/:userId/points', verifyUserToken, pointsController.getUserPoints)

router.get('/points', verifyUserToken, pointsController.getPoints)
router.post('/points', verifyUserToken, pointsController.createPoint)
router.put('/points/:pointId', verifyUserToken, pointsController.updatePoint)

module.exports = router