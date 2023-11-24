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

// POST login user
router.post("/login", async (req, res) => {
  try {
    const user = await controller.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await controller.generateAuthToken(user);
    res.send({ token });
  } catch (error) {
    res.status(401).send(error.message);
    console.log(error);
  }
});

module.exports = router;
