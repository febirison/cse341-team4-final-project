const express = require('express');

const router = express.Router();
const clubController = require('../controllers/clubController');
const {
  validateClubData,
  validateClubUpdate,
} = require('../middlewares/clubValidation');
const ensureAuthenticated = require('../middlewares/authentication');

// GET /clubs - Get all clubs
router.get('/', clubController.getAllClubs);

// GET /clubs/:id - Get club by ID
router.get('/:id', clubController.getClubById);

// POST /clubs - Create new club (with validation)
router.post(
  '/',
  ensureAuthenticated,
  validateClubData,
  clubController.createClub,
);

// PUT /clubs/:id - Update club (with validation)
router.put(
  '/:id',
  ensureAuthenticated,
  validateClubUpdate,
  clubController.updateClub,
);

// DELETE /clubs/:id - Delete club
router.delete('/:id', ensureAuthenticated, clubController.deleteClub);

module.exports = router;
