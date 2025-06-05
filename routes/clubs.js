const express = require('express');
const router = express.Router();

const clubController = require('../controllers/clubController');
const Club = require('../models/Club');

// GET /clubs
router.get('/', async (req, res) => {
  try {
    const clubs = await Club.find().populate('members', 'name email');
    res.status(200).json(clubs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching clubs', error: error.message });
  }
});

// GET /clubs/:id
router.get('/:id', async (req, res) => {
  try {
    const club = await Club.findById(req.params.id).populate('members', 'name email');
    if (!club) return res.status(404).json({ message: 'Club not found' });
    res.status(200).json(club);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching club', error: error.message });
  }
});

// POST /clubs
router.post('/', async (req, res) => {
  try {
    const club = new Club(req.body);
    await club.save();
    res.status(201).json(club);
  } catch (error) {
    res.status(400).json({ message: 'Invalid club data', error: error.message });
  }
});

// PUT /clubs/:id
router.put('/:id', async (req, res) => {
  try {
    const club = await Club.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!club) return res.status(404).json({ message: 'Club not found' });
    res.status(200).json(club);
  } catch (error) {
    res.status(400).json({ message: 'Error updating club', error: error.message });
  }
});

// DELETE /clubs/:id
router.delete('/:id', async (req, res) => {
  try {
    const club = await Club.findByIdAndDelete(req.params.id);
    if (!club) return res.status(404).json({ message: 'Club not found' });
    res.status(200).json({ message: 'Club deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting club', error: error.message });
  }
});

const clubController = require('../controllers/clubController');

// GET /clubs
router.get('/', clubController.getAllClubs);

// GET /clubs/:id
router.get('/:id', clubController.getClubById);

// POST /clubs
router.post('/', clubController.createClub);

// PUT /clubs/:id
router.put('/:id', clubController.updateClub);

// DELETE /clubs/:id
router.delete('/:id', clubController.deleteClub);


module.exports = router;
