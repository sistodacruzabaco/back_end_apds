const express = require('express');
const router = express.Router();
const donationController = require('../controllers/donationController');

// GET /donations
router.get('/getDonations', donationController.get_donations);

// POST /donation
router.post('/addDonation', donationController.add_donation);

// PUT or UPDATE /donation
router.put('/updateDonation/:id', donationController.update_donation);

// DELETE/donation
router.delete('/deleteDonation/:id', donationController.delete_donation);

module.exports = router;