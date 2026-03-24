const express = require('express');
const router = express.Router();
const explainController = require('../controllers/explainController');

router.post('/explain', explainController.explainCode);
router.get('/history', explainController.getHistory);

module.exports = router;
