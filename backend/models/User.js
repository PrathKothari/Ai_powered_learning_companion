const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({}, { strict: false }); // allows all fields

module.exports = mongoose.model('User', userSchema);
