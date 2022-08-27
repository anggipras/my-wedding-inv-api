module.exports = (app) => {
  const weddingwish = require("../controllers/weddingwishes.controller.js");

  var router = require("express").Router()

  // Create a new Tutorial
  router.post("/", weddingwish.create);

  // Retrieve all weddingwish
  router.get("/", weddingwish.findAll);
  
  app.use("/api/weddingwish", router);
};
