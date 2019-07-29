'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('category','sCategoryImage', Sequelize.STRING)
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('category','sCategoryImage')
  }
};
