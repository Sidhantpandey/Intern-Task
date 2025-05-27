import { Sequelize } from "sequelize";
import sequelize from "../config/database.cjs";

// Import Models
import School from "./school.cjs";

const db = {
  sequelize,
  Sequelize,
  School,
};

export default db;
