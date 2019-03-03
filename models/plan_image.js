'use strict';

const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
  const plan_image = sequelize.define('plan_image', {
    iPlanImageID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    iPlanID: DataTypes.INTEGER,
    sPlanImage: DataTypes.STRING
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'plan_image'
  });

  sequelizePaginate.paginate(plan_image)

  plan_image.associate = function(models) {
    plan_image.belongsTo(models.plan, {
      foreignKey: 'iPlanID'
    })
  };
  return plan_image;
};