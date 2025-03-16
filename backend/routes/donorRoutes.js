const express = require('express');
const { registerDonor, getDonors } = require('../controllers/donorController');

const router = express.Router();

router.post('/register', registerDonor);
router.get('/all', getDonors);

module.exports = router;
