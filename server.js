require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Campus Coordinator API is running!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});