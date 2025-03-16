const express = require('express');
const multer = require('multer');
const { registerNGO, getNGOs } = require('../controllers/ngoController'); // ✅ Fix Import

const router = express.Router();

// File Upload Setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

// Routes
router.post('/register', upload.single('governmentApprovalCertificate'), registerNGO);
router.get('/all', getNGOs); // ✅ Ensure getNGOs is properly defined in ngoController.js

module.exports = router;
