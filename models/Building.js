'use strict';
const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
  const Building = sequelize.define('Building', {
    iBuildingID: {
      allowNull: false,
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
    tableName: 'building'
  });
  Building.associate = function(models) {
    Building.hasMany(models.Advantage, {
      foreignKey: 'iBuildingID'
    })
    Building.hasMany(models.Stage, {
      foreignKey: 'iBuildingID'
    })
    Building.hasMany(models.plan, {
      foreignKey: 'iBuildingID'
    })
    Building.hasMany(models.apartament, {
      foreignKey: 'iBuildingID'
    })
  };
  sequelizePaginate.paginate(Building)

  Building.getBuildingItem = async function (iBuildingID) {
    var building = await Building.findByPk(iBuildingID, {
      include: [
        {
          model: sequelize.models.Advantage
        },
        {
          model: sequelize.models.Stage
        },
        {
          model: sequelize.models.plan,
          include: [
            {
              model: sequelize.models.plan_image
            }
          ]
        },
        {
          model: sequelize.models.apartament
        },
      ]
    })
    return building
  }

  return Building;
};