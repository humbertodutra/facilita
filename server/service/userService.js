const { User } = require('../models/');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = async (userData) => {
  const { email, password } = userData;
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  
  return await User.create({ email, password: hashedPassword });
};

const findUserByEmail = async (email) => {
  return User.findOne({ where: { email } });
};


const loginUser = async (userData) => {
  const { email, password } = userData;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new Error('User Not Found');
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error('Invalid Passowrd');
  }

  const secretKey = process.env.MY_SECRET
  const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '2h' });
  const message = {email, token: token} 

  return message;
};

module.exports = {
  createUser,
  loginUser,
  findUserByEmail
};
