'use strict';
const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
  const Stage = sequelize.define('Stage', {
    iStageID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    iBuildingID: DataTypes.INTEGER,
    tStageDesc: DataTypes.TEXT,
    dStageDate: DataTypes.DATEONLY,
    sStageImage: DataTypes.STRING
  }, {
    timestamps: false
  });
  Stage.associate = function(models) {
    Stage.belongsTo(models.Building, {
      foreignKey: 'iStageID'
    })
  };
  return Stage;
};