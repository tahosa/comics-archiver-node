'use strict';

module.exports = function(sequelize, DataTypes) {
  const Image = sequelize.define('Images', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fileName: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
      },
    },
    altText: DataTypes.TEXT,
    annotation: DataTypes.TEXT,
    sequenceNumber: DataTypes.INTEGER,
    comicId: DataTypes.INTEGER,
  });

  return Image;
};
