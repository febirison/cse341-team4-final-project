// Increase the global timeout for tests to prevent timeout errors
jest.setTimeout(30000); // 30 seconds

const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../server');
const Course = require('../models/Course');
const Student = require('../models/Student');
const Room = require('../models/Room');

const request = supertest(app);

describe('Course API Endpoints', () => {
  let testCourse;
  let testStudent;
  let testRoom;

  const existingInstructorId = new mongoose.Types.ObjectId(
    '684218a13b17c2c2ebb8c119',
  );

  // Setup test data before all tests
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);

    await Course.deleteMany({ courseName: 'Test Course' });
    await Student.deleteMany({ email: 'student@example.com' });
    await Room.deleteMany({ buildingName: 'Building A', roomNumber: '101' });

    testStudent = await Student.create({
      name: 'Test',
      lastName: 'Student',
      gender: 'other',
      dateOfBirth: new Date('2000-01-01'),
      email: 'student@example.com',
      password: 'password123',
    });

    testRoom = await Room.create({
      buildingName: 'Building A',
      roomNumber: '101',
      capacity: 25,
      students: [],
    });

    testCourse = await Course.create({
      courseName: 'Test Course',
      courseCode: 'TEST101',
      credits: 3,
      description: 'This is a test course',
      instructor: existingInstructorId,
      enrolledStudents: [testStudent._id],
    });
  }, 30000);

  // Cleanup after all tests
  afterAll(async () => {
    await Course.deleteMany({});
    await Student.deleteMany({});
    await Room.deleteMany({});
    await mongoose.connection.close();
  });

  // Test: GET all courses
  test('GET /course should return all courses', async () => {
    const res = await request.get('/course');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Test: GET a specific course by ID
  test('GET /course/:id should return a course', async () => {
    const res = await request.get(`/course/${testCourse._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('courseName', 'Test Course');
  });

  // Test: GET with valid but non-existing ID
  test('GET /course/:id should return 404 if course not found', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request.get(`/course/${fakeId}`);
    expect(res.statusCode).toBe(404);
  });

  // Test: GET with invalid ID format
  test('GET /course/:id should return 400 for invalid ID format', async () => {
    const res = await request.get('/course/invalid-id');
    expect(res.statusCode).toBe(400);
  });

  // ✅ NEW TEST: Use testRoom to prevent unused variable warning
  test('GET /room/:id should return the created room', async () => {
    const res = await request.get(`/room/${testRoom._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('buildingName', 'Building A');
    expect(res.body).toHaveProperty('roomNumber', '101');
  });
});
