const dbConfig = require("../config/dbConfig.js");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD,{
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected...");
  })
  .catch((err) => {
    console.log("err" + err);
  });

const db = {};

db.user = require("./user")(sequelize, DataTypes);
db.community = require("./community")(sequelize, DataTypes);
db.community_user = require("./community_user")(sequelize, DataTypes);

db.community.hasMany(db.community_user)
db.community_user.belongsTo(db.community)

db.user.hasMany(db.community_user)
db.community_user.belongsTo(db.user)

db.user.hasMany(db.community, {
  foreignKey: 'admin',
  as: 'community'
})
db.community.belongsTo(db.user, {
  foreignKey: 'admin',
  as: 'user'
})

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.sequelize
  .sync({
    alter: true,
  })
  .then(() => {
    console.log("yes re-sync done!");
  });

module.exports = db;