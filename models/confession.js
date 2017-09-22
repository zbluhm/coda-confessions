'use strict';
module.exports = (sequelize, DataTypes) => {
  var confession = sequelize.define('confession', {
    message: DataTypes.TEXT,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
          confession.belongsTo(models.user);
      }
    }
  });
  return confession;
};