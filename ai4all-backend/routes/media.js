// routes/media.js

const express = require('express');
const { addVideo, getVideos, addNews, getNews } = require('../controllers/mediaController');


const router = express.Router();

router.post('/videos', addVideo);
router.get('/videos', getVideos);
router.post('/news', addNews);
router.get('/news', getNews);

module.exports = router;
