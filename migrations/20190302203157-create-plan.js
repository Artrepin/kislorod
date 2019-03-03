'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('plan', {
      iPlanID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      iBuildingID: {
        type: Sequelize.INTEGER
      },
      iTypeID: {
        type: Sequelize.INTEGER
      },
      iRoomCount: {
        type: Sequelize.INTEGER
      },
      sPlanName: {
        type: Sequelize.STRING
      }
    }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'plan'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('plan');
  }
};