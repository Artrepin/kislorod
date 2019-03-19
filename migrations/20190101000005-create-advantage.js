'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('advantage', {
      iAdvantageID: {
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
      sAdvantageTitle: {
        type: Sequelize.STRING
      }
    }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'advantage'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('advantage');
  }
};