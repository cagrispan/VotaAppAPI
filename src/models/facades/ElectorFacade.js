'use strict';

var electorEntity = require('../entities/Elector');

function ElectorEntityFacade() {
}

function read(electorId) {
    return electorEntity.findOne({where:{electorId: electorId}});
}

ElectorEntityFacade.prototype = {
    read: read
};

var electorEntityFacade = new ElectorEntityFacade();
module.exports = electorEntityFacade;
