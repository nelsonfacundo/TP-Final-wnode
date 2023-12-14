var express = require('express');
var router = express.Router();
const controller = require('../controllers/adoptions.js');
const authenticateToken = require('../middleware/authenticateToken'); 

/*POST http://localhost:3000/api/adoptions/add-adoption */
router.post('/add-adoption', authenticateToken, async (req, res) => {
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
/* http://localhost:3000/api/adoptions/approve-adoption/65525e0a36c94bed0118e3e7 */
router.put('/approve-adoption/:id',authenticateToken, async (req, res) => {
  try {
    const result = await controller.approveAdoption(req.params.id);
    res.send(result);
  } catch (error) {
    res.status(500).send('PUT fail: ' + error);
  }
});

//rechazar adopción
router.delete("/reject-adoption/:id",authenticateToken, async (req, res) => {
  try {
    const result = await controller.rejectAdoption(req.params.id);
    res.send(result);
  } catch (error) {
    res.status(500).send('delete fail: ' + error);
  }
});

//quitar adopción
router.delete("/delete-adoption/:id",authenticateToken, async (req, res) => {
  try {
    const result = await controller.deleteAdoption(req.params.id);
    res.send(result);
  } catch (error) {
    res.status(500).send('delete fail: ' + error);
  }
 
});

module.exports = router;
