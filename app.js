var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
router.use(function (req, res, next) { next(); });

// For making calls to Google Places API
var request = require('request');

app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res) {
  res.sendfile('./public/index.html'); // load the single view file
});

// Mongo && models
var mongoose = require('mongoose');
require('./models/Places');
mongoose.connect('mongodb://bbuser:jjJ#(*sD#59jskdL@ds059712.mongolab.com:59712/barkbites');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Models
var Place = mongoose.model('Place');

// API
router.route('/places')
  .get(function (req, res) {
    Place.find(function (err, places) {
      if (err) { res.sendStatus(err); }
      res.json(places);
    });
  })

  .post(function (req, res) {
    Place.count({googlePlaceId: req.body.googlePlaceId}, function (err, count) {
      if (!count) {
        new Place(req.body).save();
        res.json({message: 'New place created!'});
      } else {
        res.json({message: 'Place can not be added. Already in database!'});
      }
    });
  });

router.route('/places/:id')
  .get(function (req, res) {
    Place.findOne(function (err, place) {
      if (err) { res.sendStatus(err); }
      res.json(place);
    });
  })

  .delete(function (req, res) {
    var GPID = req.params.id;
    Place.count({googlePlaceId: GPID}, function (err, count) {
      if (!count) {
        res.json({message: 'can not delete place, not found by googlePlaceId in database.'})
      } else {
        Place.remove({googlePlaceId: GPID}, function (err) {
          if (err) res.json({message: err.message});
          res.json({message: 'Place successfully deleted.'});
        });
      }
    });
  })

  .put(function (req, res) {
    var GPID = req.params.id;
    Place.count({googlePlaceId: GPID}, function (err, count) {
      if (!count) {
        res.json({message: 'can not update place, not found by googlePlaceId in database.'})
      } else {
        Place.findOneAndUpdate({googlePlaceId: GPID}, req.body, function (err) {
          if (err) res.json({message: err.message});
          res.json({message: 'Place successfully updated.'});
        });
      }
    });
  });

router.route('/places/search/:searchString')
  .get(function (req, res) {
    console.log(req.params.searchString);
    Place.findOne({'name': new RegExp(req.params.searchString, 'i') }, function (err, place) {
      if (err) res.json({message: 'No places found with that name'});
      res.status(200).json(place);
    });
  });



app.use('/api/v0', router);
var port = process.env.PORT || 7000;
var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('BarkBitesServer listening at http://%s:%s', host, port);
});