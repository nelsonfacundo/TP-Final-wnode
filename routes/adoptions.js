var express = require('express');
var router = express.Router();
const controller = require('../controllers/adoptions.js');

/* GET adoptions listing. */
router.get('/', async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await controller.getAllAdoptions(pageSize, page));
});



module.exports = router;
