var express = require('express');
var app = express();

app.get('/location/:lat/:long', function (req, res) {
  var obj = {'location': {
    'latitude': req.params.lat,
    'longitude': req.params.long
  }}
  res.send(obj);
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});