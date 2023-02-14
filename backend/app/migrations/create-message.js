"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Messages", {
      id: {
        allowNull: false,
        primaryKey: true,
        // type: Sequelize.UUID,
        // defaultValue: Sequelize.UUIDV4,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      sender: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Users",
            // schema: "schema",
          },
          key: "id",
        },
        allowNull: false,
      },
      receiver: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Users",
            // schema: "schema",
          },
          key: "id",
        },
        allowNull: false,
      },
      message: {
        type: Sequelize.STRING,
        allowNull: false,
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
    await queryInterface.dropTable("Messages");
  },
};
