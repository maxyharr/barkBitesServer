var mongoose = require('mongoose');

var PlaceSchema = new mongoose.Schema({
  petRestriction: String,
  googlePlaceId: String,
  notes: String
});

mongoose.model('Place', PlaceSchema);