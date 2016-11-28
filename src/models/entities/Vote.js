'use strict';

var Sequelize = require('sequelize');
var config = require('../../config/env.config.js');
var sequelize = new Sequelize(
    config.db.name,
    config.db.user,
    config.db.password,
    {
        host: config.db.hostdb,
        dialect: config.db.dialect,
        logging: config.db.logging
    }
);

module.exports = sequelize.define('votes', {
    voteId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    electorId:{
        type: Sequelize.STRING
    },
    mayorId: {
        type: Sequelize.STRING
    },
    councilmanId : {
        type: Sequelize.STRING
    }
});

