'use strict';

const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
  const department = sequelize.define('department', {
    iDepartmentID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    sDepartmentTitle: DataTypes.STRING
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'department'
  });

  sequelizePaginate.paginate(department)

  department.associate = function(models) {
    department.hasMany(models.people, {
      foreignKey: 'iDepartmentID'
    })
  };
  return department;
};