var express = require("express");
var router = express.Router();
const TITLE = require("../lib/constants");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: TITLE });
});

module.exports = router;
