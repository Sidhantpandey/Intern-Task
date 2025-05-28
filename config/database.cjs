const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

// Connecting with database
const sequelize = new Sequelize(
  process.env.MYSQLDATABASE,
  process.env.MYSQLUSER,
  process.env.MYSQLPASSWORD,
  {
    host: process.env.MYSQLHOST,
    dialect: "mysql",
    dialect: 'mysql',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // PlanetScale uses self-signed certs
    }
  },
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
