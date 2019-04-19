'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.addColumn('users', 'facebookId', Sequelize.STRING)
    .then(() => {
      return queryInterface.addColumn('users', 'facebookToken', Sequelize.STRING)
    })
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.removeColumn('users', 'facebookId')
    .then(() => {
      return queryInterface.removeColumn('users', 'facebookToken')
    })
  }
};
