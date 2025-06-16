const express = require('express');

const router = express.Router();
const validateCreateRoom = require('../middlewares/validateCreateRoom');
const validateUpdateRoom = require('../middlewares/validateUpdateRoom');
const roomController = require('../controllers/roomController');
const ensureAuthenticated = require('../middlewares/authentication');

// GET all Rooms
router.get('/', roomController.getAllRooms);

// GET a single Room by ID
router.get('/:id', roomController.getRoomById);

// POST create a new Room
router.post(
  '/',
  ensureAuthenticated,
  validateCreateRoom,
  roomController.createRoom,
);

// PUT update a Room by ID
router.put(
  '/:id',
  ensureAuthenticated,
  validateUpdateRoom,
  roomController.updateRoom,
);

// DELETE a Room by ID
router.delete('/:id', ensureAuthenticated, roomController.deleteRoom);

module.exports = router;
