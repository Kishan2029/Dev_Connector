const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')

const User = require('../../models/Users')

// @route    GET api/auth
// @desc     Test route
// @access   Public 
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

// @route    POST api/auth
// @desc     Authinicate user & get token
// @access   Public 
router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        // console.log(req.body)

        const { email, password } = req.body

        try {
            let user = await User.findOne({ email })

            //If user already exist
            if (!user) {
                return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
            }
            else {
                console.log(req.body)
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
            }




            //return webtoken
            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 360000 },
                (err, token) => {
                    if (err) throw err
                    res.json({ token })
                }
            )

            // res.send('User Registered')

        } catch (err) {
            console.error(err.message)
            res.status(500).send('Server error')
        }

        // res.send('User Route')
    })

module.exports = router