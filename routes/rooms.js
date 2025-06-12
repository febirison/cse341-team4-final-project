const express = require('express');

const router = express.Router();
const validateCreateRoom = require('../middlewares/validateCreateRoom');
const validateUpdateRoom = require('../middlewares/validateUpdateRoom');
const roomController = require('../controllers/roomController');

// GET all Rooms
router.get('/', roomController.getAllRooms);

// GET a single Room by ID
router.get('/:id', roomController.getRoomById);

// POST create a new Room
router.post('/', validateCreateRoom, roomController.createRoom);

// PUT update a Room by ID
router.put('/:id', validateUpdateRoom, roomController.updateRoom);

// DELETE a Room by ID
router.delete('/:id', roomController.deleteRoom);

module.exports = router;
