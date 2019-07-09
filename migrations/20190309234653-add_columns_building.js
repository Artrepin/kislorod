'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
		return Promise.all( [
			queryInterface.addColumn('building',"fBuildingFloors", Sequelize.FLOAT),
			queryInterface.addColumn('building',"fBuildingDistance", Sequelize.FLOAT),
			queryInterface.addColumn('building',"sBuildingStatus", Sequelize.STRING),
			queryInterface.addColumn('building',"sBuildingDistrict", Sequelize.STRING),
			queryInterface.addColumn('building',"sBuildingType", Sequelize.STRING),
			queryInterface.addColumn('building',"dBuildingDateAdded", Sequelize.DATEONLY),
			queryInterface.addColumn('building',"iBuildingViews", Sequelize.INTEGER),
			queryInterface.addColumn('building',"iPeopleID", Sequelize.INTEGER),
		])
  },

  down: (queryInterface, Sequelize) => {
		return Promise.all([
			queryInterface.removeColumn('building',"fBuildingFloors", Sequelize.FLOAT),
			queryInterface.removeColumn('building',"fBuildingDistance", Sequelize.FLOAT),
			queryInterface.removeColumn('building',"sBuildingStatus", Sequelize.STRING),
			queryInterface.removeColumn('building',"sBuildingDistrict", Sequelize.STRING),
			queryInterface.removeColumn('building',"sBuildingType", Sequelize.STRING),
			queryInterface.removeColumn('building',"dBuildingDateAdded", Sequelize.DATEONLY),
			queryInterface.removeColumn('building',"iBuildingViews", Sequelize.INTEGER),
			queryInterface.removeColumn('building',"iPeopleID", Sequelize.INTEGER),
		])
  }
};
