const NGO = require('../models/NGO');  // ✅ Ensure correct import

exports.registerNGO = async (req, res) => {
    try {
        const { ngoName, email, registrationNumber, contactPersonName, contactPersonPhone, ngoAddress, website, mission, walletAddress, password } = req.body;

        const newNGO = new NGO({
            ngoName,
            email,
            registrationNumber,
            contactPersonName,
            contactPersonPhone,
            ngoAddress,
            website,
            mission,
            walletAddress,
            password,
            governmentApprovalCertificate: req.file ? req.file.path : null
        });

        await newNGO.save();
        res.status(201).json({ message: 'NGO registered successfully' });
    } catch (error) {
        console.error('Error registering NGO:', error);
        res.status(400).json({ error: error.message });
    }
};

// ✅ Fix: Ensure getNGOs function is defined
exports.getNGOs = async (req, res) => {
    try {
        const ngos = await NGO.find();
        res.json(ngos);
    } catch (error) {
        console.error('Error fetching NGOs:', error);
        res.status(500).json({ error: 'Failed to fetch NGOs' });
    }
};
