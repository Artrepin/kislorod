'use strict';
const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
  const Building = sequelize.define('Building', {
    iBuildingID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    sBuildingTitle: DataTypes.STRING,
    sBuildingAvatar: DataTypes.STRING,
    sBuildingCoverSmall: DataTypes.STRING,
    sBuildingCoverBig: DataTypes.STRING,
    sBuildingDescription: DataTypes.TEXT,
    fBuildingLocationeX: DataTypes.FLOAT,
    fBuildingLocationeY: DataTypes.FLOAT,
    sBuildingYoutube: DataTypes.STRING,
    dBuildingReady: DataTypes.DATEONLY
  }, {
    timestamps: false,
    freezeTableName: true,
  });
  Building.associate = function(models) {
    Building.hasMany(models.Advantage, {
      foreignKey: 'iBuildingID'
    })
    Building.hasMany(models.Stage, {
      foreignKey: 'iBuildingID'
    })
  };
  sequelizePaginate.paginate(Building)

  Building.getBuildingItem = async function (iBuildingID) {
    var building = await Building.findById(iBuildingID)
    building.dataValues.advantage = await sequelize.models.Advantage.findAll({
      where: {
        iBuildingID: iBuildingID
      }
    })
    building.dataValues.stage = await sequelize.models.Stage.findAll({
      where: {
        iBuildingID: iBuildingID
      }
    })
    return building
  }

  return Building;
};