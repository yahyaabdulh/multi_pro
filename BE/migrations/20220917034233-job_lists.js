'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('job_lists', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      }, 
      type: {
        allowNull: false,
        type: Sequelize.STRING
      },
      url: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      company: {
        type: Sequelize.STRING,
      },      
      company_url: {
        type: Sequelize.TEXT,
      }, 
      location: {
        type: Sequelize.STRING,
      }, 
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
      },   
      how_to_apply: {
        type: Sequelize.TEXT,
      },    
      company_logo: {
        type: Sequelize.TEXT,
      },
      created_at: {
        allowNull: false,
        defaultValue : Sequelize.NOW,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        defaultValue : Sequelize.NOW,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('job_lists');
  }
};