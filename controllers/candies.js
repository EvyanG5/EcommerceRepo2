// controllers/applications.js

const express = require('express');
const router = express.Router();

const User = require('../candyshop/models/user.js');

router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        res.render('candies/index.ejs', { candies: currentUser.candySchema });
        // If candies were in a separate collection:
        //
        const candies = await Candy.find({ user: req.params.userId });
        res.render('candies/index.ejs', { candies });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
// controllers/applications.js

router.get('/new', async (req, res) => {
  res.render('candies/new.ejs');
});
router.post('/', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    user.candySchema.push(req.body);
    await user.save();
    res.redirect(`/users/${req.params.userId}/candies`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
router.get('/:candyId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const candy = currentUser.candySchema.id(req.params.candyId);
    res.render('candies/show.ejs', { candy });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
router.delete('/:candyId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    user.candySchema.id(req.params.candyId).remove();
    await user.save();
    res.redirect(`/users/${req.params.userId}/candies`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
router.get('/:candyId/edit', async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const candy = currentUser.candySchema.id(req.params.candyId);
    res.render('candies/edit.ejs', { candy });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
router.put('/:candyId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const candy = currentUser.candySchema.id(req.params.candyId);
    candy.set(req.body);
    await currentUser.save();
    res.redirect(`/users/${req.params.userId}/candies/${req.params.candyId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
