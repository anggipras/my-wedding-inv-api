module.exports = (sequelize, Sequelize) => {
  const Weddingwishes = sequelize.define("weddingwishes", {
    person_name: {
      type: Sequelize.STRING,
    },
    wishes: {
      type: Sequelize.STRING,
    },
    attendace: {
      type: Sequelize.BOOLEAN,
    },
  });
  return Weddingwishes;
};
