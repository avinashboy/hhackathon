const User = require('../models/User')
const authService = require('../services/authService')

exports.registerUser = async (req, res) => {
  try {
    const { username, password, email } = req.body
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const user = new User({ username, password, email })
    await user.save()

    res.status(201).json({ message: 'User registered successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error })
  }
}

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (
      !user ||
      !(await authService.comparePasswords(password, user.password))
    ) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const token = authService.generateToken(user)
    res.status(200).json({ token, message: 'Login successful' })
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error })
  }
}
