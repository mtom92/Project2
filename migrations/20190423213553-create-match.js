'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING,
        defaultValue:'Inactive'
      },
      contact: {
        type: Sequelize.STRING
      },
      likeness: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      interviewDate: {
        type: Sequelize.DATE
      },
      currentPhase: {
        type: Sequelize.STRING,
        defaultValue:'Frozen'
      },
      interviewAddress: {
        type: Sequelize.TEXT
      },
      comment: {
        type: Sequelize.TEXT
      },
      jobId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'jobs', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('matches');
  }
};
