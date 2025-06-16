const mongoose = require('mongoose'); // ⬅️ don't forget import
const Club = require('../models/Club');

const getAllClubs = async (req, res) => {
  try {
    const clubs = await Club.find().populate('members', 'name email');
    res.status(200).json(clubs);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching clubs',
      error: error.message,
    });
  }
};

const getClubById = async (req, res) => {
  try {
    const club = await Club.findById(req.params.id).populate(
      'members',
      'name email',
    );
    if (!club) return res.status(404).json({ message: 'Club not found' });
    res.status(200).json(club);
  } catch (error) {
    // ✅  added CastError Handling for invalid ObjectId format
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: 'Invalid club ID format' });
    }
    res.status(500).json({
      message: 'Error fetching club',
      error: error.message,
    });
  }
};

const createClub = async (req, res) => {
  try {
    const club = new Club(req.body);
    await club.save();
    // ✅ added send return clubId
    res.status(201).json({
      message: 'Club created successfully',
      club,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Invalid club data',
      error: error.message,
    });
  }
};

const updateClub = async (req, res) => {
  try {
    const club = await Club.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!club) return res.status(404).json({ message: 'Club not found' });
    res.status(200).json({ message: 'Club updated successfully', club });
  } catch (error) {
    res.status(400).json({
      message: 'Error updating club',
      error: error.message,
    });
  }
};

const deleteClub = async (req, res) => {
  try {
    const club = await Club.findByIdAndDelete(req.params.id);
    if (!club) return res.status(404).json({ message: 'Club not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting club',
      error: error.message,
    });
  }
};

module.exports = {
  getAllClubs,
  getClubById,
  createClub,
  updateClub,
  deleteClub,
};
