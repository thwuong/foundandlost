const { Sequelize } = require("sequelize");
import mysql2 from "mysql2";
const sequelize = new Sequelize("foundandlost", "root", "chiast123", {
  host: "localhost",
  dialect: "mysql",
  dialectModule: mysql2,
  logging: false,
});

module.exports = {
  async connectDB() {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  },
  sequelize,
};
