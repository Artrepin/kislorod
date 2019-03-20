'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('people', {
      iPeopleID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      iDepartmentID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'department',
          key: 'iDepartmentID',
        },
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE',
      },
      sPeopleLastname: {
        type: Sequelize.STRING
      },
      sPeopleName: {
        type: Sequelize.STRING
      },
      sPeoplePosition: {
        type: Sequelize.STRING
      },
      sPeopleImage: {
        type: Sequelize.STRING
      },
    }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'people'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('people');
  }
};