var Sequelize = require('sequelize');

var sequelize = new Sequelize('postgres://aawjewel@aaw:ABcd12345@aaw.postgres.database.azure.com:5432/aawqf', {
        dialect: 'postgres',
        protocol: 'postgres',
        logging: true,
        timestamps: false
    })

var User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING,
    field: 'fname' // Will result in an attribute that is firstName when user facing but first_name in the database
  },
  lastName: {
    type: Sequelize.STRING,
    field: 'lname'
  },
  middleName: {
    type: Sequelize.STRING,
    field: 'mname'
  },
  email: {
    type: Sequelize.STRING,
    field: 'email'
  },
   mobile: {
    type: Sequelize.STRING,
    field: 'mobile'
  },
   qatarId: {
    type: Sequelize.STRING,
    field: 'qatar_id'
  },
   password: {
    type: Sequelize.STRING,
    field: 'password'
  },
  active: {
    type: Sequelize.BOOLEAN,
    field: 'active'
  },
  contactDetails: {
    type: Sequelize.TEXT,
    field: 'active'
  }
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});

module.exports = User;