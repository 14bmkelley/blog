
'use strict';

let fs      = require('fs');
let path    = require('path');



module.exports.route = function(route, router, context) {

    router.get(route, function(request, response) {
        response.render('root', {
            'content': 'home',
            'styles': [ 'home.css' ],
            'scripts': []
        });
    });

};



// Make this function externally available.

module.exports.map = function(router, context) {

    // Recursively route from files in this directory.

    console.log('controllers/index.js: including controllers.');

    let routeRegex = /controllers(.+)\./g;

    (function recursivelyRoute(dir, callback) {
        fs.readdir(dir, function(err, fileList) {

            if (err) return callback(err);

            var pending = fileList.length;
            if (!pending) return callback(null);
            
            fileList.forEach(function(file) {

                var filepath = path.resolve(dir, file);

                fs.stat(filepath, function(err, stat) {

                    if (err) return callback(err);

                    else if (stat && stat.isDirectory()) {
                        recursivelyRoute(filepath, function() {
                            if (!--pending) callback(null);
                        });
                    }

                    else {

                        // File found, route it.
                        console.log('  file found: ' + filepath);
                        var route = filepath.split(routeRegex)[1];

                        if (route.substring(route.length - 5, route.length) == 'index')
                            route = route.substring(0, route.length - 5);

                        var filelib = require(filepath);

                        if (filelib.map && filepath !== __filename)
                            filelib.map(router, context);

                        if (filelib.route)
                            filelib.route(route, router, context);

                        if (!--pending) callback(null);

                    }

                });

            });

        });
    })('./controllers', function(err) {
        if (err) console.log(err);
        console.log('controllers/index.js: completed!\n');
    });

    return router;

};

