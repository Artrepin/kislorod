'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('apartament', {
      iApartamentID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      iBuildingID: {
        type: Sequelize.INTEGER
      },
      iApartamentNum: {
        type: Sequelize.INTEGER
      },
      iApartamentFloor: {
        type: Sequelize.INTEGER
      },
      iApartamentPrice: {
        type: Sequelize.INTEGER
      },
      iPlanID: {
        type: Sequelize.INTEGER
      },
    }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'apartament'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('apartament');
  }
};