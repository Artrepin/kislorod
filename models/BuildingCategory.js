module.exports = (sequelize, DataTypes) => {
  const BuildingCategory = sequelize.define('BuildingCategory', {
    iBuildingID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Building',
        key: 'iBuildingID'
      }
    },
    iCategoryID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model:'Category',
        key: 'iCategoryID'
      }
    }
  },{
		timestamps: false,
		freezeTableName: true,
		tableName: 'building_category'	
	});
  return BuildingCategory;
};
