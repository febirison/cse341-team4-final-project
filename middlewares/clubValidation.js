const validateClubData = (req, res, next) => {
  const { name, description, meetingStartTime, meetingEndTime } = req.body;
  const errors = [];

  // Validate required fields
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    errors.push('Club name is required and must be a non-empty string');
  }

  if (
    !description ||
    typeof description !== 'string' ||
    description.trim().length === 0
  ) {
    errors.push('Club description is required and must be a non-empty string');
  }

  if (!meetingStartTime) {
    errors.push('Meeting start time is required');
  } else if (isNaN(Date.parse(meetingStartTime))) {
    errors.push('Meeting start time must be a valid date');
  }

  if (!meetingEndTime) {
    errors.push('Meeting end time is required');
  } else if (isNaN(Date.parse(meetingEndTime))) {
    errors.push('Meeting end time must be a valid date');
  }

  // Validate that end time is after start time
  if (meetingStartTime && meetingEndTime) {
    const startDate = new Date(meetingStartTime);
    const endDate = new Date(meetingEndTime);

    if (endDate <= startDate) {
      errors.push('Meeting end time must be after start time');
    }
  }

  // Validate name length
  if (name && name.trim().length > 100) {
    errors.push('Club name must be less than 100 characters');
  }

  // Validate description length
  if (description && description.trim().length > 500) {
    errors.push('Club description must be less than 500 characters');
  }

  // Validate members array if provided
  if (req.body.members && !Array.isArray(req.body.members)) {
    errors.push('Members must be an array');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: errors,
    });
  }

  next();
};

const validateClubUpdate = (req, res, next) => {
  const { name, description, meetingStartTime, meetingEndTime } = req.body;
  const errors = [];

  // For updates, fields are optional but must be valid if provided
  if (name !== undefined) {
    if (typeof name !== 'string' || name.trim().length === 0) {
      errors.push('Club name must be a non-empty string');
    } else if (name.trim().length > 100) {
      errors.push('Club name must be less than 100 characters');
    }
  }

  if (description !== undefined) {
    if (typeof description !== 'string' || description.trim().length === 0) {
      errors.push('Club description must be a non-empty string');
    } else if (description.trim().length > 500) {
      errors.push('Club description must be less than 500 characters');
    }
  }

  if (meetingStartTime !== undefined && isNaN(Date.parse(meetingStartTime))) {
    errors.push('Meeting start time must be a valid date');
  }

  if (meetingEndTime !== undefined && isNaN(Date.parse(meetingEndTime))) {
    errors.push('Meeting end time must be a valid date');
  }

  // Validate time relationship if both are provided
  if (meetingStartTime && meetingEndTime) {
    const startDate = new Date(meetingStartTime);
    const endDate = new Date(meetingEndTime);

    if (endDate <= startDate) {
      errors.push('Meeting end time must be after start time');
    }
  }

  if (req.body.members !== undefined && !Array.isArray(req.body.members)) {
    errors.push('Members must be an array');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: errors,
    });
  }

  next();
};

module.exports = {
  validateClubData,
  validateClubUpdate,
};
