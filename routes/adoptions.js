var express = require('express');
var router = express.Router();
const controller = require('../controllers/adoptions.js');

/*POST http://localhost:3000/api/adoptions/add-adoption */
router.post('/add-adoption', async (req, res) => {
  try {
    const result = await controller.addAdoption(
      req.body.petId,
      req.body.adopterId
    );
    res.send(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.error(error.message);
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

//quitar adopción
router.delete("/delete-adoption/:id", async (req, res) => {
  try {
    await controller.deleteAdoption(req.params.id);
    res.send("Operación exitosa");
  } catch (error) {
    res.send(error.message);
  }
});

//quitar adopción
router.delete("/reject-adoption/:id", async (req, res) => {
  try {
    await controller.rejectAdoption(req.params.id);
    res.send("Operación exitosa");
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;