'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('type', [
      {
        iTypeID: 1,
        sTypeTitle: "Студия"
      },
      {
        iTypeID: 2,
        sTypeTitle: "Однокомнатная квартира"
      },
      {
        iTypeID: 3,
        sTypeTitle: "Двухкомнатная квартира"
      },
      {
        iTypeID: 4,
        sTypeTitle: "Трехкомнатная квартира"
      },
      {
        iTypeID: 5,
        sTypeTitle: "Четырехкомнатная квартира"
      },
      {
        iTypeID: 6,
        sTypeTitle: "Пятикомнатная квартира"
      },
      {
        iTypeID: 7,
        sTypeTitle: "Пентхаус"
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('type', null, {});
  }
};
