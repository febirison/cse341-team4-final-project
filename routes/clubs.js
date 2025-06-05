const express = require('express');
const router = express.Router();

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
