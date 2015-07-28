var mongoose = require('mongoose');

var PlaceSchema = new mongoose.Schema({
  name: String,
  petRestriction: String,
  googlePlaceId: String,
  notes: String
});

mongoose.model('Place', PlaceSchema);