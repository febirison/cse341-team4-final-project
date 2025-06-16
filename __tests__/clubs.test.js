const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const Club = require('../models/Club');

describe('Club API - Basic GET Endpoints Only', () => {
  let testClub;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    await Club.deleteMany();

    // 🔹 สร้าง test data
    testClub = new Club({
      name: 'Test Club',
      description: 'A club for testing',
      meetingStartTime: new Date('2025-06-15T10:00:00Z'),
      meetingEndTime: new Date('2025-06-15T11:30:00Z'),
    });
    await testClub.save();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('GET /club - should return all clubs (200)', async () => {
    const res = await request(app).get('/club');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('GET /club/:id - should return a single club (200)', async () => {
    const res = await request(app).get(`/club/${testClub._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(testClub._id.toString());
    expect(res.body.name).toBe('Test Club');
  });

  test('GET /club/:id - should return 404 for non-existent ID', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/club/${fakeId}`);
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toMatch(/not found/i);
  });

  test('GET /club/:id - should return 400 for invalid ID format', async () => {
    const res = await request(app).get(`/club/invalid-id`);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/invalid/i);
  });
});
