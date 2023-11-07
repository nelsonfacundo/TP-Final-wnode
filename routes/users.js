var express = require("express");
var router = express.Router();
const controller = require("../controllers/users");

router.post("/register", async (req, res) => {
  try {
    const newUser = req.body;
    const result = await controller.addUser(newUser);
    console.log(result);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

module.exports = router;
