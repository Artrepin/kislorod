'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('content', {
			iContentId: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			sContentKey: Sequelize.TEXT,
			sContentName: Sequelize.TEXT,
			sContentValue: Sequelize.TEXT
    }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'content'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('content');
  }
};
