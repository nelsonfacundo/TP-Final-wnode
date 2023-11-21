var express = require('express');
var router = express.Router();
const controller = require('../controllers/adoptions.js');

/* GET adoptions listing. */
router.get('/', async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await controller.getAllAdoptions(pageSize, page));
});

/*POST http://localhost:3000/api/adoptions/add-adoption */
router.post('/add-adoption', async (req, res) => {
  try {
    const result = await controller.addAdoption(
      req.body.petId,
      req.body.adopterId
    );
    res.send(result);
  } catch (error) {
    res.status(400).send(error);
    console.error(error.message);
  }
});


module.exports = router;
