const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.comparePasswords = async (inputPassword, userPassword) => {
  return await bcrypt.compare(inputPassword, userPassword);
};

exports.generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });
};
