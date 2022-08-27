const db = require("../models");
const WeddingWish = db.weddingwish;
const Op = db.Sequelize.Op;

// Create and Save a new WeddingWish
exports.create = (req, res) => {
  // Validate request
  if (!req.body.person_name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // Create a WeddingWish
  const weddingobj = {
    person_name: req.body.person_name,
    wishes: req.body.wishes,
    attendace: req.body.attendace ? req.body.attendace : true,
  };
  // Save WeddingWish in the database
  WeddingWish.create(weddingobj)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the WeddingWish.",
      });
    });
};

// Retrieve all WeddingWishes from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
  WeddingWish.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving weddingwishes.",
      });
    });
};
