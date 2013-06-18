var express = require('express');
var app = express();
var getimg = require('./resizinate');

app.get(/^\/(\d+)[^\d](\d+)/, function(req, res) {
  getimg(req.params[0], req.params[1], function(err, img) {
    if (err) return res.send(500, err.message);
    res.set('Content-Type', 'image/jpeg');
    img.pipe(res);
  });
});

app.listen(3000 || process.env.PORT);
