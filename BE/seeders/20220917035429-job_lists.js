'use strict';
const axios = require('axios')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const response = await axios.get('http://dev3.dansmultipro.co.id/api/recruitment/positions.json')
    const data_insert = response.data?.map(({created_at, ...row}) => {
      return {
        created_at : created_at,
        updated_at : new Date(),
        ...row
      }
    })
    return queryInterface.bulkInsert('job_lists', data_insert)
 
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('job_lists', null, {});
  }
};
