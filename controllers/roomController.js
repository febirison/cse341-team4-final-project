const Room = require('../models/Room');

// Get all rooms
const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find().populate('students', 'name email');
    res.status(200).json(rooms);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching rooms', error: error.message });
  }
};

// Get a single room by ID
const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id).populate(
      'students',
      'name email',
    );
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.status(200).json(room);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching room', error: error.message });
  }
};

// Create a new room
const createRoom = async (req, res) => {
  try {
    const room = new Room(req.body);
    await room.save();
    res.status(201).json(room);
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Invalid room data', error: error.message });
  }
};

// Update an existing room
const updateRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.status(200).json(room);
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error updating room', error: error.message });
  }
};

// Delete a room
const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.status(200).json({ message: 'Room deleted successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error deleting room', error: error.message });
  }
};

module.exports = {
  getAllRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
};
