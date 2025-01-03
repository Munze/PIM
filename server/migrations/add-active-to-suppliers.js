module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Suppliers', 'active', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Suppliers', 'active');
  },
};
