var Sequelize = require('sequelize');
var config = require('./../config/config');
var POSTGRES_URL = config.POSTGRES_URL
var sequelize = new Sequelize(POSTGRES_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        logging: true,
        timestamps: false
    })

var Otp = sequelize.define('otp', {
	userId: {
        type: Sequelize.INTEGER,
        field: 'user_id' 
      },
      otp: {
        type: Sequelize.INTEGER,
        field: 'otp' 
      },
      otpType: {
        type: Sequelize.INTEGER,
        field: 'otp_type' 
      } 
    },
    {
        freezeTableName: true // Model tableName will be the same as the model name
});

module.exports = Otp; 