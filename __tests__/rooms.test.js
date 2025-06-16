const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const Room = require('../models/Room');

describe('Room API - Basic GET Endpoints Only', () => {
  let testRoom;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    await Room.deleteMany();

    // build test data
    testRoom = new Room({
      buildingName: 'Main Hall',
      roomNumber: 'B101',
      capacity: 40,
    });
    await testRoom.save();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('GET /room - should return all rooms (200)', async () => {
    const res = await request(app).get('/room');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('GET /room/:id - should return a single room (200)', async () => {
    const res = await request(app).get(`/room/${testRoom._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(testRoom._id.toString());
    expect(res.body.buildingName).toBe('Main Hall');
  });

  test('GET /room/:id - should return 404 for non-existent ID', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/room/${fakeId}`);
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toMatch(/not found/i);
  });

  test('GET /room/:id - should return 400 for invalid ID format', async () => {
    const res = await request(app).get(`/room/invalid-id`);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/invalid/i);
  });
});
