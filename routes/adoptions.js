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

//Ver adopciones pendientes
/* http://localhost:3000/api/adoptions/awaiting-adoptions */
router.get('/awaiting-adoptions', async (req, res) => {
  try {
    res.json(await controller.getAwaitingAdoptions());
  } catch (error) {
    res.status(400).send(error);
    console.error(error);
  }
});

//Obtener adopción por id
/* http://localhost:3000/api/adoptions/65525e0a36c94bed0118e3e7 */
router.get('/:id', async (req, res) => {
  try {
    res.json(await controller.getAdoption(req.params.id));
  } catch (error) {
    res.status(404).send('Adopción no existente');
    console.error(error);
  }
});

//Aprobar adopción
/* http://localhost:3000/api/adoptions/aproove-adoption/65525e0a36c94bed0118e3e7 */
router.put('/aproove-adoption/:id', async (req, res) => {
  try {
    const result = await controller.aprooveAdoption(req.params.id);
    res.send(result);
  } catch (error) {
    res.status(500).send('PUT fail: ' + error);
  }
});

module.exports = router;
