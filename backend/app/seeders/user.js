module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        idNumber: "A1906585",
        fullName: "admin",
        address: "3/2, Xuân khánh, Ninh kiều, Cần Thơ",
        phone: "0794290085",
        email: "admin@gmail.com",
        password: "IWvm/ajiErMUhbEhIWgRperxJ7jYViOjrGOg+U9i2fg=",
        isAdmin: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
