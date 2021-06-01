const express = require('express')
const { model } = require('mongoose')
const router = express.Router()

// @route    GET api/users
// @desc     Test route
// @access   Public 
router.get('/', (req,res) => res.send('User Route'))

module.exports = router