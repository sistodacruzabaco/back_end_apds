const express = require('express');
const router = express.Router();
const partnerController = require('../controllers/partnerController');
const multer = require('multer')
// const uploadImages = require('../middleware/uploadImages');

const storage = multer.memoryStorage();
const upload = multer({storage:storage});

// GET /partners
router.get('/getPartners', partnerController.get_partners);

// POST /partner
router.post('/addPartner', upload.single('image'), partnerController.add_partner);

// PUT or UPDATE /partner
router.put('/updatePartner/:id', upload.single('logotipo'),  partnerController.update_partner);

// DELETE/partner
router.delete('/deletePartner/:id', partnerController.delete_partner);

module.exports = router;