'use strict';

var Controller = require('./../controllers/controller.js');
var controller = new Controller();

module.exports = function (server) {

    /*
     Auth
     */
    server.get('/auth/:electorId/password/:password', controller.auth);

    /*
     User Votes
     */
    server.post('/electors/:id/votes', [controller.addVote]);

    /*
     Candidates
     */
    server.get('/mayors', [controller.getMayors]);
    server.get('/councilmen', [controller.getCouncilmen]);

};
