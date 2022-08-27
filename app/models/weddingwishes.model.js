module.exports = (sequelize, Sequelize) => {
  const Weddingwishes = sequelize.define(
    "weddingwishes",
    {
      person_name: {
        type: Sequelize.STRING,
      },
      wishes: {
        type: Sequelize.STRING,
      },
      attendance: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
  return Weddingwishes;
};
