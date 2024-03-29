const moment = require("moment");
const db = require("../models");
const { getPagingData } = require("../utils/func");
const WeddingWish = db.weddingwish;
const nodefetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

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
    attendance: req.body.attendance !== null ? req.body.attendance : true,
    createdAt: moment().format(),
  };
  // Save WeddingWish in the database
  WeddingWish.create(weddingobj)
    .then((data) => {
      const bodyPushNotif = {
        to: "cHcvInoZS-W1qpp01ZSZ00:APA91bH0enRqOJhK4vD1_NuyTA-gnzLuMS3fDG0VlZOG-rTFeYmW4RCSyzcv2cSZMTaz_AQ55aBA49ph30d-ROzNCNR_tYLq7-3YZXvCjnVSNNqlLZfkd_5F6pCQgi4rLNilJXwMsErY",
        notification: {
          body: data.wishes,
          title: data.person_name,
        },
      };

      nodefetch("https://fcm.googleapis.com/fcm/send", {
        method: "post",
        body: JSON.stringify(bodyPushNotif),
        headers: {
          Authorization: `key=${process.env.FCMTOKEN}`,
          "Content-Type": "application/json",
        },
      })
        .then(() => {
          console.log("berhasil");
          res.send(data);
        })
        .catch((err) => {
          console.log(err);
          res.send(data);
        });
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
  const options = {
    limit: 5,
    page: req.query.page ? req.query.page : 1,
  };

  WeddingWish.findAndCountAll({
    limit: options.limit,
    offset: options.page * options.limit - options.limit,
    where: {},
    order: [["id", "DESC"]],
  })
    .then((data) => {
      const response = getPagingData(data, options.page, options.limit);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving weddingwishes.",
      });
    });
};

exports.deleteAll = (_, res) => {
  WeddingWish.destroy({
    where: {},
    truncate: true,
    restartIdentity: true,
  })
    .then((data) => {
      res.send({
        message: `${data} Wedding Wishes were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving weddingwishes.",
      });
    });
};
