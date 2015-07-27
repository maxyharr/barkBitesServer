var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
router.use(function (req, res, next) { next(); });

// For making calls to Google Places API
var request = require('request');

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
    var place = Place.findOne({"googlePlaceId": req.body.googlePlaceId});
    if (!place) {
      Place.collection.insert(req.body, function (err) {
        if (err) res.sendStatus(err);
        res.json({message: 'Place created!'});
      });
    } else {
      res.json({message: 'Place already created!'});
    }
  });

router.route('/places/:id')
  .get(function (req, res) {
    Place.findOne(function (err, place) {
      if (err) { res.sendStatus(err); }
      res.json(place);
    });
  })

  .delete(function (req, res) {
    Place.remove({ _id: req.params.id }, function (err) {
      if (err) res.sendStatus(err);
      res.sendStatus(204);
    });
  })

  .put(function (req, res) {
    Place.findOneAndUpdate({_id: req.params.id}, req.body, function (err, place) {
      if (err) {
        res.sendStatus(err);
      } else {
        res.json(place);
      }
    });
  });

app.use('/api/v0', router);
var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('BarkBitesServer listening at http://%s:%s', host, port);
});