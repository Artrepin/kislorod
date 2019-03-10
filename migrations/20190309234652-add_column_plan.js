'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('plan', 'fPlanArea', Sequelize.FLOAT)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('plan', 'fPlanArea')
  }
};
