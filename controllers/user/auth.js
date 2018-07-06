
'use strict';

let firebase = require('firebase');

module.exports.route = function(route, router, context) {

    router.get(route, function(request, response) {
        response.end('Hello auth!');
    });

    router.post(route, function(request, response) {

        if (request.body.register) {
            firebase.auth().createUserWithEmailAndPassword(
                request.body.email, request.body.password)
                .then(function onResolveCreateUser() {
                    response.send({ 'success': true });
                },
                function onRejectCreateUser(error) {
                    error.success = false;
                    response.send(error);
                });
        }

        else {
            firebase.auth().signInWithEmailAndPassword(
                request.body.email, request.body.password)
                .then(function onResolveCreateUser() {
                    response.send({ 'success': true });
                },
                function onRejectCreateUser(error) {
                    error.success = false;
                    response.send(error);
                });
        }

    });

};

