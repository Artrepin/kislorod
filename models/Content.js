'use strict';
const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
  const Content = sequelize.define('Content', {
    iContentId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    sContentKey: DataTypes.TEXT,
    sContentName: DataTypes.TEXT,
		sContentValue: DataTypes.TEXT
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'content'
  });
  return Content;
};
