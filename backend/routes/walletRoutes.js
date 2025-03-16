const express = require('express');
const Wallet = require('../models/Wallet');
const router = express.Router();

// Get wallet balance for logged-in user
router.get('/balance/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const wallet = await Wallet.findOne({ userId });

        if (!wallet) return res.status(404).json({ message: "Wallet not found" });

        res.json({ balance: wallet.balance, currency: wallet.currency });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
