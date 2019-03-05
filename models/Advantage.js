'use strict';
const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
  const Advantage = sequelize.define('Advantage', {
    iAdvantageID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    iBuildingID: DataTypes.INTEGER,
    sAdvantageTitle: DataTypes.STRING
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'advantage'
  });
  Advantage.associate = function(models) {
    Advantage.belongsTo(models.Building, {
      foreignKey: 'iAdvantageID'
    })
  };
  return Advantage;
};