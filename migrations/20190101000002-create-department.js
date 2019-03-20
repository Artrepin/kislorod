'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('department', {
      iDepartmentID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sDepartmentTitle: {
        type: Sequelize.STRING
      }
    }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'department'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('department');
  }
};