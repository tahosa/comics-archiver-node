'use strict';

module.exports = function(sequelize, DataTypes) {
  const Comic = sequelize.define('Comic', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    folder: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.TEXT,
    start: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
    latest: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
      },
    },
    linkSelector: DataTypes.STRING,
    imgSelector: DataTypes.STRING,
    noteSelector: DataTypes.STRING,
  });

  return Comic;
};
