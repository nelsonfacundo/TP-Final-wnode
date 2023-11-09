var express = require("express");
var router = express.Router();
const controller = require("../controllers/users");
const schemaUser = require("../schemas/validateUser");
const message = require("../lib/messages");
const errors = require("../lib/errors");

router.post("/register", async (req, res) => {
  try {
    const newUser = schemaUser.validateUser(req.body);
    const result = await controller.addUser(newUser);
    if (result.acknowledged) {
      res.send(message.SUCCESSFULL_USER_CREATED);
    } else {
      res.status(500).send(errors.REQUEST_ERROR);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
