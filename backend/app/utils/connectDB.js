require("dotenv").config();
const { Sequelize } = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];

const mysql2 = require("mysql2");
const sequelize = new Sequelize(config.database, config.username, config.password, {
  ...config,
  dialectModule: mysql2,
  logging: false,
  pool: {
    maxUses: 20,
  },
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
