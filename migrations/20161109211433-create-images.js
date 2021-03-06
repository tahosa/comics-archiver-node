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
        unique: 'comic',
      },
      altText: Sequelize.TEXT,
      annotation: Sequelize.TEXT,
      sequenceNumber: Sequelize.INTEGER,
      comicId: {
        type: Sequelize.INTEGER,
        unique: 'comic',
        references: {
          model: 'Comics',
          key: 'id',
        },
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down(queryInterface, Sequelize) {
    return queryInterface.deleteTable('Comics');
  },
};
