const express = require('express');
const app = express();
const cors = require('cors')
const userController = require('./api/userController');
const loanController = require('./api/loanController');
const transactionController = require('./api/transactionController');
const { authMiddleware } = require('./config/middleware');
require('dotenv').config();
require('./config/db');

app.use(express.json());
app.use(cors());

app.post('/api/users/register', userController.registerUser);
app.post('/api/users/login', userController.loginUser);

// DUMMY ROUTE
app.use('/api/loans', authMiddleware, loanController.createLoan);
app.use('/api/transactions', authMiddleware, transactionController.createTransaction);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
