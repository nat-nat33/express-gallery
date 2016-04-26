module.exports = function (sequelize, DataTypes) {

  var Gallery = sequelize.define('Gallery', {
    author: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
      classMethods: {
      associate: function (models) {
        Gallery.belongsTo(models.Gallery);
      }
    }
  });
  return Gallery;
};



