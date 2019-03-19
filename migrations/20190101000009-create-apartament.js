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
        type: Sequelize.INTEGER,
        references: {
          model: 'building',
          key: 'iBuildingID',
        },
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE',
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
        type: Sequelize.INTEGER,
        references: {
          model: 'plan',
          key: 'iPlanID',
        },
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE',
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