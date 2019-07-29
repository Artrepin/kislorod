'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('category', {
      iCategoryID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sCategoryName: {
        type: Sequelize.STRING
      },
			iCategorySort:Sequelize.INTEGER
    }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'category'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('category');
  }
};
