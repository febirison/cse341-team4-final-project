const User = require('../models/Student');
const passport = require('passport');

const show = async (req, res, next) => {
  try {
    // #swagger.tags = ['Auth']
    // #swagger.summary = 'Get the authenticated user profile'
    const { id } = req.user;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    // #swagger.tags = ['Auth']
    // #swagger.summary = 'Update authenticated user profile'
    const { _id } = req.user;
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        ...req.body,
        updatedAt: Date.now(),
      },
      { new: true },
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

const githubLogin = passport.authenticate('github', { scope: ['user:email'] });

const githubCallback = (req, res, next) => {
  /* #swagger.ignore = true */
  console.log('GitHub callback triggered');
  console.log('User authenticated with GitHub:', req.user);
  passport.authenticate('github', {
    successRedirect: '/api-docs',
    failureRedirect: '/github/login',
  })(req, res, next);
  console.log('GitHub authentication completed');
};

const logout = (req, res, next) => {
  try {
    // #swagger.tags = ['Auth']
    // #swagger.summary = 'Logout user'
    req.logout((err) => {
      if (err) {
        return next(err);
      }

      req.session.destroy((sessionErr) => {
        if (sessionErr) {
          return next(sessionErr);
        }

        // O responder con un mensaje JSON
        res.clearCookie('connect.sid'); // Limpia la cookie de sesión
        res.status(200).json({ message: 'Logged out successfully' });
      });
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  show,
  update,
  githubLogin,
  githubCallback,
  logout,
};
