'use strict';

module.exports = function(sequelize, DataTypes) {
  const Comic = sequelize.define('Comics', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
      },
    },
    author: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
      },
    },
    description: DataTypes.TEXT,
    start: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        isUrl: true,
      },
    },
    latest: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
      },
    },
    linkRegex: DataTypes.STRING,
    imgRegex: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });

  return Comic;
};
