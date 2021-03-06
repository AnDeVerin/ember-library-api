const createModel = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    'Review',
    {
      body: DataTypes.STRING,
    },
    {},
  );

  Review.associate = (models) => {
    Review.belongsTo(models.Book);
    Review.belongsTo(models.User);
  };
  return Review;
};
export default createModel;
