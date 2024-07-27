const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  // Define transaction schema
});

module.exports = mongoose.model('Transaction', TransactionSchema);
