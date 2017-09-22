'use strict';
module.exports = (sequelize, DataTypes) => {
  var Confession = sequelize.define('Confession', {
    message: DataTypes.TEXT,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
          models.confession.belongsTo(models.user)
      }
    }
  });
  return Confession;
};