const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  "adgg",
  process.env.DB_USERNAME,
  process.env.DB_USER_PASSWORD,
  {
    host: process.env.DATABASE_HOSTNAME,
    dialect: "mysql",
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

sequelize.sync();

module.exports = {
  sequelize: sequelize,
};
