'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        firstName: "Joe",
        lastName: "Smith",
        emailAddress: "joe@smith.com",
        password: "joepassword"
      },
      {
        firstName: "Sally",
        lastName: "Jones",
        emailAddress: "sally@jones.com",
        password: "sallypassword"
      }
  ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
