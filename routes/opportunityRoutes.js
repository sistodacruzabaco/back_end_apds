const express = require('express');
const router = express.Router();
const partnerController = require('../controllers/opportunityController');

// GET / Opportunities
router.get('/getOpportunities', partnerController.get_opportunities);

// POST /Opportunity
router.post('/addOpportunity', partnerController.add_opportunity);

// PUT or UPDATE / Opportunity
router.put('/updateOpportunity/:id', partnerController.update_opportunity);

// DELETE/ Opportunity
router.delete('/deleteOpportunity/:id', partnerController.delete_opportunity);

module.exports = router;