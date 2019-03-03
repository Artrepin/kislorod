'use strict';

const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
  const plan = sequelize.define('plan', {
    iPlanID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    iBuildingID: DataTypes.INTEGER,
    iTypeID: DataTypes.INTEGER,
    iRoomCount: DataTypes.INTEGER,
    sPlanName: DataTypes.STRING
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'plan'
  });

  sequelizePaginate.paginate(plan)

  plan.associate = function(models) {
    plan.hasMany(models.plan_image, {
      foreignKey: 'iPlanID'
    })
    // plan.belongsTo(models.apartament, {
    //   foreignKey: 'iPlanID'
    // })
  };
  return plan;
};