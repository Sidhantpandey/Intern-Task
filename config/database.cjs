const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

// Connecting with database
const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
    logging: false,
  }
);

// IIFE calls
(async () => {
  try {
    await sequelize.authenticate({ retry: { max: 2 }, timeout: 5000 });
    console.log("Database connected successfully!");
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
})();

module.exports = sequelize;
