const router = require('express').Router()

module.exports = router;


router.use('/google', require('./google'))
