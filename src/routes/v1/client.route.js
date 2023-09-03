//Internal Lib Import
const express = require('express');
const { Info, Testimonial, Brand, Service, Team, Blog } = require('../../models');

const router = express.Router();

router.post('/blogs', async (req, res) => {
  const result = await Blog.create(req.body);

  res.json({ data: result });
});

router.get('/siteinfo', async (req, res) => {
  const siteInfo = await Info.find();
  res.json({ data: siteInfo });
});
router.get('/testimonials', async (req, res) => {
  const testimonials = await Testimonial.find();
  res.json({ data: testimonials });
});
router.get('/brands', async (req, res) => {
  const brands = await Brand.find();
  res.json({ data: brands });
});
router.get('/services', async (req, res) => {
  const services = await Service.find();
  res.json({ data: services });
});
router.get('/services/:id', async (req, res) => {
  const service = await Service.findById(req.params.id);
  res.json({ data: service });
});
router.get('/teams', async (req, res) => {
  const teams = await Team.find();
  res.json({ data: teams });
});
router.get('/blogs', async (req, res) => {
  const blogs = await Blog.find();
  res.json({ data: blogs });
});
router.get('/blogs/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) blog.view++;
  await blog.save();
  res.json({ data: blog });
});

module.exports = router;
