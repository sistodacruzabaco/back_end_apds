const express = require('express');
const router = express.Router(); 
const feedController = require('../controllers/feedController');
const uploadImages = require('../middleware/uploadImages');


// GET /feeds
router.get('/getFeeds', feedController.get_feeds);

// POST /feed
router.post('/addFeed', uploadImages.upload.single('image'),feedController.add_feed);

// PUT/feed
router.put('/updateFeed/:id', uploadImages.upload.single('image'), feedController.update_feed)

// DELETE/feed
router.delete('/deleteFeed/:id', feedController.delete_feed);

module.exports = router;