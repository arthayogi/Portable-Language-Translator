const express = require('express')
const Controller = require('../controllers')
const { authentication } = require('../middlewares/authentication')
const router = express.Router()

router.post('/login', Controller.login)
router.post('/register', Controller.register)
router.post('/google-login', Controller.googleLogin)

router.use(authentication)

router.patch('/profiles', Controller.updateUsername)
router.get('/profiles', Controller.viewUsername)
router.delete('/profiles', Controller.deleteUser)

router.post('/translate-jp', Controller.translateAI_JP)
router.post('/translate-en', Controller.translateAI_EN)
router.post('/translate-kr', Controller.translateAI_KR)


module.exports = router