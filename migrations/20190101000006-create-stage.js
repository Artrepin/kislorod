'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('stage', {
      iStageID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      iBuildingID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'building',
          key: 'iBuildingID',
        },
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE',
      },
      tStageDesc: {
        type: Sequelize.TEXT
      },
      dStageDate: {
        type: Sequelize.DATEONLY
      },
      sStageImage: {
        type: Sequelize.STRING
      }
    }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'stage'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('stage');
  }
};