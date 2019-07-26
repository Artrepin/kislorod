'use strict';
const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    iCategoryID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    sCategoryName: DataTypes.STRING,
    sCategoryImage: DataTypes.STRING,
		iCategorySort: DataTypes.INTEGER
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'category'
  });
  Category.associate = function(models) {
    Category.belongsToMany(models.Building, {
      through: 'BuildingCategory',
			foreignKey: 'iCategoryID'
    })
  };
  return Category;
};
