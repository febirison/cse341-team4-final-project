const isAuthenticated = (req, res, next) => {
  console.log('Checking authentication status...');

  if (!req.isAuthenticated()) {
    return res.status(401).json({
      message: 'Unauthorized: Please log in',
    });
  }
  console.log(req.user);
  console.log('User authenticated:', req.user?.email || 'Unknown user');
  next();
};

const isProfileComplete = (req, res, next) => {
  console.log('Checking if profile is complete...');
  const requiredFields = [
    'name',
    'lastName',
    'gender',
    'dateOfBirth',
    'password',
    'profilePicture',
    'phoneNumber',
  ];
  const missingFields = requiredFields.filter((field) => !req.user[field]);

  if (missingFields.length > 0) {
    return res.status(403).json({
      message:
        'Forbidden: Please complete your profile before continuing using the app.',
      missingFields: missingFields,
    });
  }

  console.log('Profile is complete for user:', req.user.email);
  next();
};

module.exports = {
  isAuthenticated,
  isProfileComplete,
};
