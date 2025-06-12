const { isAuthenticated } = require('../middlewares/auth.middleware');
const authRoutes = require('express').Router();
const {
  show,
  update,
  githubLogin,
  githubCallback,
  logout,
} = require('../controllers/authController');
const validateUpdateStudent = require('../middlewares/validateUpdateStudent');

authRoutes.get('/github/login', githubLogin);
authRoutes.get('/github/callback', githubCallback);
authRoutes.get('/github/logout', isAuthenticated, logout);

authRoutes.get('/profile', isAuthenticated, show);
authRoutes.put('/profile', isAuthenticated, validateUpdateStudent, update);

module.exports = authRoutes;
