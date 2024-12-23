module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Suppliers', 'username', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Suppliers', 'password', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Suppliers', 'soapBody', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Suppliers', 'username');
    await queryInterface.removeColumn('Suppliers', 'password');
    await queryInterface.removeColumn('Suppliers', 'soapBody');
  },
};
