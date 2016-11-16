'use strict';

module.exports = function(sequelize, DataTypes) {
  const Image = sequelize.define('Image', {
    fileName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    altText: DataTypes.TEXT,
    annotation: DataTypes.TEXT,
    sequenceNumber: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate(models) {
        this.belongsTo(models.Comic);
      },
    },
  });

  return Image;
};
