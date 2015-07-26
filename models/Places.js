var mongoose = require('mongoose');

var PlaceSchema = new mongoose.Schema({
  petRestriction: String,
  googlePlaceId: String
});

mongoose.model('Place', PlaceSchema);