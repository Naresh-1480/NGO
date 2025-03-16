const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const ngoSchema = new mongoose.Schema({
    ngoName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    registrationNumber: { type: String, required: true },
    governmentApprovalCertificate: { type: String },
    contactPersonName: { type: String, required: true },
    contactPersonPhone: { type: String, required: true },
    ngoAddress: { type: String, required: true },
    website: { type: String },
    mission: { type: String, required: true },
    walletAddress: { type: String },
    password: { type: String, required: true }
}, { timestamps: true });

// Hash password before saving
ngoSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('NGO', ngoSchema);
