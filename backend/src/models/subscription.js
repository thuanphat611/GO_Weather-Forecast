const mongoose = require('mongoose');
const crypto = require('crypto');

const subscriptionSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  verifyToken: {
    type: String,
    default: function() { //auto generate verify token
      return crypto.randomBytes(20).toString('hex');
    }
  },
  unsubscribeToken: {
    type: String
  },
  isVerified: {
    type: Boolean,
    default: false
  }
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;
