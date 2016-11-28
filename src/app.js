'use strict';

var restify = require('restify'),
    server = restify.createServer();
server.use(restify.bodyParser({overrideParams: true}));
server.use(restify.queryParser());

server.use(restify.CORS());

server.on('MethodNotAllowed', unknownMethodHandler);

var config = require('./config/env.config.js');
require('./config/routes.config.js')(server);

try {
    server.listen(config.rest.port, '::', function () {
        console.log('%s listening at %s', server.name, server.url);
    });
} catch (e) {
    console.log(e);
}

function unknownMethodHandler(req, res) {
    if (req.method.toLowerCase() === 'options') {
        var allowHeaders = ['Accept', 'Accept-Version', 'Content-Type', 'Api-Version', 'token', 'facebookId'];

        if (res.methods.indexOf('OPTIONS') === -1) res.methods.push('OPTIONS');

        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Headers', allowHeaders.join(', '));
        res.header('Access-Control-Allow-Methods', res.methods.join(', '));
        res.header('Access-Control-Allow-Origin', req.headers.origin);

        return res.send(204);
    }
    else
        return res.send(new restify.MethodNotAllowedError());
}
