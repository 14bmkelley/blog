
var mkdirp = require('mkdirp');
var fs = require('fs');
var dirname = require('path').dirname;

function copyWithMkdirp(src, dest, callback) {
    mkdirp(dirname(dest), function(err) {
        if (err) callback(err);
        else {
            fs.createReadStream(src).pipe(fs.createWriteStream(dest));
            callback(null);
        }
    });
}

copyWithMkdirp('./node_modules/jquery/dist/jquery.min.js',
               './static/libs/jquery/jquery.min.js',
               (err) => {
                    if (err) throw err;
               });

copyWithMkdirp('./node_modules/bootstrap/dist/js/bootstrap.min.js',
               './static/libs/bootstrap/bootstrap.min.js',
               (err) => {
                    if (err) throw err;
               });

copyWithMkdirp('./node_modules/bootstrap/dist/css/bootstrap.min.css',
               './static/libs/bootstrap/bootstrap.min.css',
               (err) => {
                    if (err) throw err;
               });

