'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('building_category', {
			iBuildingCategoryID:{
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			iBuildingID: {
				type: Sequelize.INTEGER,
				//references: {
					//model: 'Building',
					//key: 'iBuildingID'
				//},
				//primaryKey:true,
				//onUpdate: 'NO ACTION',
				//onDelete: 'NO ACTION'
			},
			iCategoryID: {
				type: Sequelize.INTEGER,
				//references: {
					//model: 'Category',
					//key: 'iCategoryID'
				//},
				//primaryKey:true,
				//onUpdate: 'NO ACTION',
				//onDelete: 'NO ACTION'
			}
    }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'building_category'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('building_category');
  }
};
