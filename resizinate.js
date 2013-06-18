var fs = require('fs');
var spawn = require('child_process').spawn;

var ignore = [".DS_Store"];

module.exports = function(width, height, cb) {
  width = parseInt(width, 10);
  height = parseInt(height, 10);
  
  if (isNaN(width) || isNaN(height) || width < 0 || height < 0) {
    return cb(new Error("Bad input width/height"));
  }

  fs.readdir(__dirname + '/img', function(err, images) {
    if (err) return cb(err);
    images = images.filter(function(img) { return !~ignore.indexOf(img) });
    if (!images.length) return cb(new Error("Images folder is empty, bro"));
    var image = __dirname + '/img/' + images[Math.floor(Math.random() * images.length)];
    var convert = spawn('convert', [
      image,
      '-resize', width + 'x' + height + '^',
      '-extent', width + 'x' + height,
      '-gravity', 'center',
      '-'
    ]);
    convert.on('error', cb);
    cb(null, convert.stdout);
  });
};
