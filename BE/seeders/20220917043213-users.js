'use strict';
const uuid = require('uuid');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        "id" : uuid.v4(),
        "name": "yahya abdul hamid",
        "username": "admin96",
        "email": "admin96@gmail.com",
        "password": "admin123",
        "is_active": true,
        "password" : "$2a$10$PAxg8iGWhKUXwf08Ln72/uBNMM9NXtMcilWiDAUtuYeZs6EI.au0.",
        "created_at" : new Date(),
        "updated_at" : new Date(),
      }
    ])

  },
  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
