const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Geolocation schema
const GeoSchema = new Schema({
  type: {
    type: String,
    default: "Point"
  },
  coordinates: {
    type: [Number],
    index: "2dsphere"
  }
});

// Create Dev schema
const DevSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name field is required']
  },
  age: {
    type: Number
  },
  available: {
    type: Boolean,
    default: false
  },
  geometry: GeoSchema
});

// Create Dev model ** 'dev' is the collection's name in the DB **
const DevModel = mongoose.model('dev', DevSchema);

module.exports = DevModel;