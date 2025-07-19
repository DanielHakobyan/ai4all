// controllers/mediaController.js

const Video = require('../models/Video');
const News = require('../models/News');

const addVideo = async (req, res) => {
  const { title, url, source } = req.body;
  const video = new Video({ title, url, source });
  await video.save();
  res.status(201).json(video);
};

const getVideos = async (req, res) => {
  const videos = await Video.find().sort({ createdAt: -1 });
  res.json(videos);
};

const addNews = async (req, res) => {
  const { title, content, link } = req.body;
  const news = new News({ title, content, link });
  await news.save();
  res.status(201).json(news);
};

const getNews = async (req, res) => {
  const news = await News.find().sort({ createdAt: -1 });
  res.json(news);
};

module.exports = {
  addVideo,
  getVideos,
  addNews,
  getNews,
};
