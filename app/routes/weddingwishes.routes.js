module.exports = (app) => {
  const weddingwish = require("../controllers/weddingwishes.controller.js");

  var router = require("express").Router()

  // Create a new weddingwish
  router.post("/", weddingwish.create);

  // Retrieve all weddingwish
  router.get("/", weddingwish.findAll);

  // Delete all weddingwish
  router.delete("/", weddingwish.deleteAll);
  
  app.use("/api/weddingwish", router);
};
