'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('department', [
      {
        iDepartmentID: 1,
        sDepartmentTitle: "Отдел по работе с клиентами"
      },
      {
        iDepartmentID: 2,
        sDepartmentTitle: "Юридический отдел"
      },
      {
        iDepartmentID: 3,
        sDepartmentTitle: "Ипотечный отдел"
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('department', null, {});
  }
};
