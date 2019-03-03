'use strict';

const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
  const type = sequelize.define('type', {
    iTypeID: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    sTypeTitle: DataTypes.STRING
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'type'
  });

  sequelizePaginate.paginate(type)

  type.associate = function(models) {
    // associations can be defined here
  };
  return type;
};