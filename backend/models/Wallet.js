const mongoose = require('mongoose');

const WalletSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NGO', // ✅ Fixed reference to NGOs instead of Donor
        required: true,
        unique: true
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    },
    currency: {
        type: String,
        required: true,
        default: "XRC20"
    }
}, { timestamps: true });

module.exports = mongoose.model('Wallet', WalletSchema);
