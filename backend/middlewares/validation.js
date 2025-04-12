const { body, param, validationResult } = require('express-validator');

exports.validateStudent = [
  body('first_name').notEmpty().withMessage('First name is required'),
  body('last_name').notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('date_of_birth').optional().isDate().withMessage('Valid date is required')
];

exports.validateSubject = [
  body('subject_name').notEmpty().withMessage('Subject name is required'),
  body('subject_code').notEmpty().withMessage('Subject code is required')
];

exports.validateMark = [
  body('student_id').isInt().withMessage('Valid student ID is required'),
  body('subject_id').isInt().withMessage('Valid subject ID is required'),
  body('marks_obtained').isFloat({ min: 0 }).withMessage('Valid marks are required'),
  body('max_marks').optional().isFloat({ min: 0 }).withMessage('Valid max marks are required'),
  body('exam_date').isDate().withMessage('Valid exam date is required')
];