'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('buildings', {
      iBuildingID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sBuildingTitle: {
        type: Sequelize.STRING
      },
      sBuildingAvatar: {
        type: Sequelize.STRING
      },
      sBuildingCoverSmall: {
        type: Sequelize.STRING
      },
      sBuildingCoverBig: {
        type: Sequelize.STRING
      },
      sBuildingDescription: {
        type: Sequelize.TEXT
      },
      fBuildingLocationeX: {
        type: Sequelize.FLOAT
      },
      fBuildingLocationeY: {
        type: Sequelize.FLOAT
      },
      sBuildingYoutube: {
        type: Sequelize.STRING
      },
      dBuildingReady: {
        type: Sequelize.DATEONLY
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('buildings');
  }
};