module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('suppliers', 'type_tested', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'N/A',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('suppliers', 'type_tested');
  }
};
