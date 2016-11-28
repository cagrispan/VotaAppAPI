'use strict';

var voteEntity = require('../entities/Vote');

function VoteEntityFacade() {
}

function create(vote) {
    return voteEntity.create(vote);
}

function read(electorId) {
    return voteEntity.findOne({where:{electorId: electorId}});
}

VoteEntityFacade.prototype = {
    create: create,
    read: read
};

var voteEntityFacade = new VoteEntityFacade();
module.exports = voteEntityFacade;
