const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
  // Define your schema fields here
  name: {
    type: String,
    required: true,
  },
  // Add more fields as needed
});

module.exports = mongoose.model('Data', DataSchema);
