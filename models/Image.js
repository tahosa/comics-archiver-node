'use strict';

module.exports = function(sequelize, DataTypes) {
  const Image = sequelize.define('Image', {
    fileName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'comic',
    },
    altText: DataTypes.TEXT,
    annotation: DataTypes.TEXT,
    sequenceNumber: DataTypes.INTEGER,
    comicId: {
      type: DataTypes.INTEGER,
      unique: 'comic',
    },
  }, {
    classMethods: {
      associate(models) {
        this.belongsTo(models.Comic);
      },
    },
  });

  return Image;
};
