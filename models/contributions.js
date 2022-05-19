module.exports = (sequelize, DataTypes) => {
    const CONTRIBUTION = sequelize.define("contribution", {
        amount: {type: DataTypes.STRING, required: false}
    })
    return CONTRIBUTION;
}
