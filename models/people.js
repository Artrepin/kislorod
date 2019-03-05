'use strict';

const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
  const people = sequelize.define('people', {
    iPeopleID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    iDepartmentID: DataTypes.INTEGER,
    sPeopleLastname: DataTypes.STRING,
    sPeopleName: DataTypes.STRING,
    sPeoplePosition: DataTypes.STRING,
    sPeopleImage: DataTypes.STRING
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'people'
  });

  sequelizePaginate.paginate(people)

  people.associate = function(models) {
    people.belongsTo(models.department, {
      foreignKey: 'iDepartmentID'
    })
  };
  return people;
};