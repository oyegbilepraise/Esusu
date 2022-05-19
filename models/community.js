module.exports = (sequelize, DataTypes) => {
  const COMMUNITY = sequelize.define("community", {
    description: {type: DataTypes.STRING, required: true},
    name: {type: DataTypes.STRING, required: true},
    max_capacity: {type: DataTypes.INTEGER, required: false},
    isSearchable: {type: DataTypes.BOOLEAN, required: false, defaultValue: false},
    amount: {type: DataTypes.INTEGER, required: false}
  });
  return COMMUNITY;
};
