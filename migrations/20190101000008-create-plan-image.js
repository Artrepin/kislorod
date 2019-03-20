'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('plan_image', {
      iPlanImageID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
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
      sPlanImage: {
        type: Sequelize.STRING
      }
    }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'plan_image'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('plan_image');
  }
};