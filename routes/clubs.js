const express = require('express');

const router = express.Router();
const clubController = require('../controllers/clubController');
const {
  validateClubData,
  validateClubUpdate,
} = require('../middlewares/clubValidation');

// GET /clubs - Get all clubs
router.get('/', clubController.getAllClubs);

// GET /clubs/:id - Get club by ID
router.get('/:id', clubController.getClubById);

// POST /clubs - Create new club (with validation)
router.post('/', validateClubData, clubController.createClub);

// PUT /clubs/:id - Update club (with validation)
router.put('/:id', validateClubUpdate, clubController.updateClub);

// DELETE /clubs/:id - Delete club
router.delete('/:id', clubController.deleteClub);

module.exports = router;
