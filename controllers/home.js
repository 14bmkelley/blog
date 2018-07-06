
'use strict';

module.exports.route = function(route, router, context) {

    router.get(route, function(request, response) {
        response.end('Hello home!');
    });

};

