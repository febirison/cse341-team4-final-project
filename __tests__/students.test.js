require('dotenv').config();

const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../server'); // export app from server.js
const Student = require('../models/Student');

// Create a request object using supertest
const request = supertest(app);

// Group of tests related to the Student API
describe('Student API Endpoints', () => {
  let testStudent;

  // Run once before all tests
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);

    await Student.deleteMany({ email: 'test@example.com' }); // to protect duplicate email.

    // Create a test student to be used in the test cases
    testStudent = await Student.create({
      name: 'Test',
      lastName: 'Student',
      gender: 'other',
      dateOfBirth: new Date('2000-01-01'),
      email: 'test@example.com',
      password: 'password123',
    });
    console.log('📌 Created test student:', testStudent);
  });

  // Run once after all tests are finished
  afterAll(async () => {
    await Student.deleteMany({}); // Clean up: remove test data
    await mongoose.connection.close(); // Close the database connection
  });

  // Test: GET all students
  test('GET /student should return all students', async () => {
    const res = await request.get('/student');
    expect(res.statusCode).toBe(200); // Should return 200 OK
    expect(Array.isArray(res.body)).toBe(true); // Response should be an array
  });

  // Test: GET a specific student by ID
  test('GET /student/:id should return a single student', async () => {
    console.log('🔎 Test using student ID:', testStudent._id);
    const res = await request.get(`/student/${testStudent._id}`);
    console.log('📥 RESPONSE STATUS =', res.statusCode);
    console.log('📥 RESPONSE BODY =', res.body);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('name', 'Test');
  });

  // Test: GET with valid ID that doesn't exist
  test('GET /student/:id should return 404 if student not found', async () => {
    const invalidId = new mongoose.Types.ObjectId();
    const res = await request.get(`/student/${invalidId}`); // Valid format but no record
    expect(res.statusCode).toBe(404); // Should return 404 Not Found
  });

  // Test: GET with invalid ID format
  test('GET /student/:id should return 400 for invalid ID format', async () => {
    const res = await request.get('/student/invalid-id-format');
    expect(res.statusCode).toBe(400); // Should return 400 Bad Request
  });
});
