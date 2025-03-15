const express = require('express');
const router = express.Router();

// Sample User Route
router.get('/', (req, res) => {
  res.json({ message: 'User API is working' });
});

module.exports = router;
