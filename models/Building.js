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
    sBuildingClass: DataTypes.STRING,
    sBuildingAvatar: DataTypes.STRING,
    sBuildingCoverSmall: DataTypes.STRING,
    sBuildingCoverBig: DataTypes.STRING,
    sBuildingDescription: DataTypes.TEXT,
    fBuildingLocationeX: DataTypes.FLOAT,
    fBuildingLocationeY: DataTypes.FLOAT,
    sBuildingYoutube: DataTypes.STRING,
    dBuildingReady: DataTypes.DATEONLY,
		fBuildingFloors: DataTypes.FLOAT,
		fBuildingDistance: DataTypes.FLOAT,
		sBuildingStatus: DataTypes.STRING,
		sBuildingDistrict: DataTypes.STRING,
		sBuildingType: DataTypes.STRING,
		dBuildingDateAdded: DataTypes.DATEONLY,
		iBuildingViews : DataTypes.INTEGER,
		iPeopleID: DataTypes.INTEGER,
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
    Building.hasOne(models.people, {
      foreignKey: 'iPeopleID'
    })
		Building.belongsToMany(models.Category,{
			through: 'BuildingCategory',
			foreignKey: 'iBuildingID',
			as: 'categories',
		})
  };
  sequelizePaginate.paginate(Building)

  Building.getBuildingItem = async function (iBuildingID) {
    var building = await Building.findByPk(iBuildingID, {
      include: [
				{
					model: sequelize.models.Category,
					as: 'categories',
					required: false
				},
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
            },
						{
							model: sequelize.models.apartament
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
