const { check, validationResult } = require('express-validator');

// Validation rules for item creation and updates
const validateItem = [
  check('title', 'Title is required').not().isEmpty().trim(),
  check('description', 'Description is required').not().isEmpty().trim(),
  check('type', 'Type must be either lost or found').isIn(['lost', 'found']),
  check('category', 'Category is required').not().isEmpty().trim(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = { validateItem };
