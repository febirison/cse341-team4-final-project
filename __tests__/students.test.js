jest.setTimeout(30000); // Increase global timeout to 30 seconds

const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../server');
const Student = require('../models/Student');

const request = supertest(app);

describe('Student API Endpoints', () => {
  let testStudent;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    await Student.deleteMany({ email: 'test@example.com' });

    testStudent = await Student.create({
      name: 'Test',
      lastName: 'Student',
      gender: 'other',
      dateOfBirth: new Date('2000-01-01'),
      email: 'test@example.com',
      password: 'password123',
    });
  }, 30000); // timeout for beforeAll

  afterAll(async () => {
    await Student.deleteMany({});
    await mongoose.connection.close();
  });

  test('GET /student should return all students', async () => {
    const res = await request.get('/student');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /student/:id should return a single student', async () => {
    const res = await request.get(`/student/${testStudent._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('email', 'test@example.com');
  });

  test('GET /student/:id should return 404 if student not found', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request.get(`/student/${fakeId}`);
    expect(res.statusCode).toBe(404);
  });

  test('GET /student/:id should return 400 for invalid ID format', async () => {
    const res = await request.get('/student/invalid-id');
    expect(res.statusCode).toBe(400);
  });
});
