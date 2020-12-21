const createModel = (sequelize, DataTypes) => {
  const Book = sequelize.define(
    'Book',
    {
      title: DataTypes.STRING,
      isbn: DataTypes.STRING,
      publishDate: DataTypes.DATE,
    },
    {},
  );

  Book.associate = (models) => {
    Book.belongsTo(models.Author);
    Book.hasMany(models.Review);
  };

  return Book;
};

export default createModel;
