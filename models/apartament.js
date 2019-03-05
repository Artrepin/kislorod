'use strict';

const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
  const apartament = sequelize.define('apartament', {
    iApartamentID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    iBuildingID: DataTypes.INTEGER,
    iApartamentNum: DataTypes.INTEGER,
    iApartamentFloor: DataTypes.INTEGER,
    iApartamentPrice: DataTypes.INTEGER,
    iPlanID: DataTypes.INTEGER
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'apartament'
  });

  sequelizePaginate.paginate(apartament)

  apartament.associate = function(models) {
    apartament.belongsTo(models.plan, {
      foreignKey: 'iPlanID'
    })
  };
  return apartament;
};