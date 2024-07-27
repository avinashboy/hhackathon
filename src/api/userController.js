const User = require('../models/User')
const authService = require('../services/authService')
const { check, validationResult } = require('express-validator')

exports.registerUser = [
  // Validation rules
  check('username', 'Username is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be at least 6 characters long').isLength({
    min: 6,
  }),

  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array().pop().msg })
    }

    const { username, password, email } = req.body

    try {
      const existingUser = await User.findOne({ email })

      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' })
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      const user = new User({ username, password: hashedPassword, email })
      await user.save()

      res.status(201).json({ message: 'User registered successfully' })
    } catch (error) {
      res.status(500).json({ message: 'Error registering user', error })
    }
  },
]

exports.loginUser = [
  // Validation rules
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),

  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array().pop().msg })
    }

    const { email, password } = req.body

    try {
      const user = await User.findOne({ email })

      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' })
      }

      // Compare passwords
      const isMatch = await authService.comparePasswords(
        password,
        user.password
      )
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' })
      }

      // Generate token
      const token = authService.generateToken(user)

      res.status(200).json({ token, message: 'Login successful' })
    } catch (error) {
      res.status(500).json({ message: 'Error logging in', error })
    }
  },
]
