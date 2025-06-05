const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const Room = require('../models/Room');

// GET /rooms
router.get('/', async (req, res) => {
  try {
    const rooms = await Room.find().populate('students', 'name email');
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching rooms', error: error.message });
  }
});

// GET /rooms/:id
router.get('/:id', async (req, res) => {
  try {
    const room = await Room.findById(req.params.id).populate('students', 'name email');
    if (!room) return res.status(404).json({ message: 'Room not found' });
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching room', error: error.message });
  }
});

// POST /rooms
router.post('/', async (req, res) => {
  try {
    const room = new Room(req.body);
    await room.save();
    res.status(201).json(room);
  } catch (error) {
    res.status(400).json({ message: 'Invalid room data', error: error.message });
  }
});

// PUT /rooms/:id
router.put('/:id', async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!room) return res.status(404).json({ message: 'Room not found' });
    res.status(200).json(room);
  } catch (error) {
    res.status(400).json({ message: 'Error updating room', error: error.message });
  }
});

// DELETE /rooms/:id
router.delete('/:id', async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) return res.status(404).json({ message: 'Room not found' });
    res.status(200).json({ message: 'Room deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting room', error: error.message });
  }
});

module.exports = router;
