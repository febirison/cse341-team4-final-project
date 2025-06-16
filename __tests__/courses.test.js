const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../server');
const Course = require('../models/Course');
const Student = require('../models/Student');
//const Room = require('../models/Room');

// Create a request object using supertest
const request = supertest(app);

// Group of tests related to the Course API
describe('Course API Endpoints', () => {
  let testCourse;
  let testStudent;
  //let testRoom;

  // use instructorId from DB that exiting
  const existingInstructorId = new mongoose.Types.ObjectId(
    '684218a13b17c2c2ebb8c119',
  );

  // Run once before all tests
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);

    await Course.deleteMany({ title: 'Test Course' });
    await Student.deleteMany({ email: 'student@example.com' });
    //await Room.deleteMany({ buildingName: 'Building A', roomNumber: '101' });

    // Create a test student to be used in the test cases
    testStudent = await Student.create({
      name: 'Test',
      lastName: 'Student',
      gender: 'other',
      dateOfBirth: new Date('2000-01-01'),
      email: 'student@example.com',
      password: 'password123',
    });

    // Create a test room to be used in the test cases
    /*testRoom = await Room.create({
      buildingName: 'Building A',
      roomNumber: '101',
      capacity: 25,
      students: [],
    });*/

    // Create a test course to be used in the test cases
    testCourse = await Course.create({
      title: 'Test Course',
      courseCode: 'TEST101',
      credits: 3,
      description: 'This is a test course',
      instructor: existingInstructorId, // ✅ use instructor ID that exiting.
      //rooms: testRoom._id,
      students: [testStudent._id],
    });
  });

  // Run once after all tests are finished
  afterAll(async () => {
    await Course.deleteMany({});
    await Student.deleteMany({});
    // await Room.deleteMany({});
    await mongoose.connection.close();
  });

  // Test: GET all Courses
  test('GET /course should return all courses', async () => {
    const res = await request.get('/course');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Test: GET a specific Course by ID
  test('GET /course/:id should return a course', async () => {
    const res = await request.get(`/course/${testCourse._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('title', 'Test Course');
  });

  // Test: GET with valid ID that doesn't exist
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
});
