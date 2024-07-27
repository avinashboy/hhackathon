const mongoose = require('mongoose');

const LoanSchema = new mongoose.Schema({
  // Define loan schema
});

module.exports = mongoose.model('Loan', LoanSchema);
