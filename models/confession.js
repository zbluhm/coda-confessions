'use strict';
module.exports = (sequelize, DataTypes) => {
  var Confession = sequelize.define('Confession', {
    message: DataTypes.TEXT,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
          Confession.belongsTo(models.User);
      }
    }
  });
  return Confession;
};