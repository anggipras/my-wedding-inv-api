module.exports = {
  HOST: "YOUR_DATABASE_URL",
  USER: "YOUR_USER",
  PASSWORD: "YOUR_PASSWORD",
  DB: "YOUR_DATABASE_NAME",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
