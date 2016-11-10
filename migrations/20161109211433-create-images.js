'use strict';
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('Images', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      fileName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      altText: Sequelize.TEXT,
      annotation: Sequelize.TEXT,
      sequenceNumber: Sequelize.INTEGER,
      comicId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Comics',
          key: 'id',
        },
      },
    });
  },

  down(queryInterface, Sequelize) {
    return queryInterface.deleteTable('Comics');
  },
};
