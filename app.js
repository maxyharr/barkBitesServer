var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// Mongo
var mongoose = require('mongoose');
mongoose.connect('mongodb://bbuser:jjJ#(*sD#59jskdL@ds059712.mongolab.com:59712/barkbites');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router



app.get('/location/:lat/:long', function (req, res) {
  var obj = {'location': {
    'latitude': req.params.lat,
    'longitude': req.params.long
  }}
  res.send(obj);
});

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('BarkBitesServer listening at http://%s:%s', host, port);
});