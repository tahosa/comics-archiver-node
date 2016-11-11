'use strict';
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('Comics', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      folder: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      author: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: Sequelize.TEXT,
      start: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      latest: Sequelize.STRING,
      linkSelector: Sequelize.STRING,
      imgSelector: Sequelize.STRING,
      noteSelector: Sequelize.STRING,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down(queryInterface, Sequelize) {
    return queryInterface.deleteTable('Comics');
  },
};
