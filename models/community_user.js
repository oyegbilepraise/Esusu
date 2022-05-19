module.exports = (sequelize, DataTypes) => {
    const COMMUNITY_USERS = sequelize.define("community_users", {
        contribution_amount: {type: DataTypes.INTEGER, required: false}
    })
    return COMMUNITY_USERS;
}
