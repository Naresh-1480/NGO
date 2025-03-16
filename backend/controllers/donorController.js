const Donor = require('../models/Donor');

exports.registerDonor = async (req, res) => {
    try {
        const { fullName, email, phone, walletAddress, password } = req.body;

        const newDonor = new Donor({ fullName, email, phone, walletAddress, password });
        await newDonor.save();
        res.status(201).json({ message: 'Donor registered successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getDonors = async (req, res) => {
    const donors = await Donor.find();
    res.json(donors);
};
