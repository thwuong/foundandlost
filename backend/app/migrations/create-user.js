"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      idNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: { is: /([A-Z])+([0-9]{7})\b/ },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          min: 8,
        },
      },
      email: {
        type: Sequelize.STRING,
        validate: {
          isEmail: true,
        },
        allowNull: false,
      },
      fullName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
        validate: {
          is: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
        },
        allowNull: false,
      },
      avatar: {
        type: Sequelize.STRING,
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
