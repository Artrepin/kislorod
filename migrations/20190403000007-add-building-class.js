'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('building','sBuildingClass', Sequelize.STRING)
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('building','sBuildingClass')
  }
};
