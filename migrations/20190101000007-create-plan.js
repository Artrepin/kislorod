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
        type: Sequelize.INTEGER,
        references: {
          model: 'building',
          key: 'iBuildingID',
        },
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE',
      },
      iTypeID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'type',
          key: 'iTypeID',
        },
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE',
      },
      iRoomCount: {
        type: Sequelize.INTEGER
      },
      sPlanName: {
        type: Sequelize.STRING
      },
      fPlanArea: {
        type: Sequelize.INTEGER
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