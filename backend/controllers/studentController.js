const studentModel = require('../models/studentModel');
const { validationResult } = require('express-validator');
const logger = require('../utils/logger');

exports.createStudent = async (req, res, next) => {
  try {
    logger.info('Creating student');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.warn('Validation errors', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    logger.info('Creating student in database');
    const student = await studentModel.create(req.body);
    logger.info('Student created successfully');
    res.status(201).json(student);
  } catch (err) {
    logger.error('Error creating student', err);
    next(err);
  }
};

exports.getAllStudents = async (req, res, next) => {
  try {
    logger.info('Fetching all students');
    const { page = 1, limit = 10 } = req.query;
    logger.info(`Fetching students with page=${page} and limit=${limit}`);
    const students = await studentModel.findAll({ page, limit });
    const total = await studentModel.count();
    logger.info(`Fetched ${students.length} students`);
    
    res.json({
      data: students,
      meta: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    logger.error('Error fetching all students', err);
    next(err);
  }
};

exports.getStudentById = async (req, res, next) => {
  try {
    logger.info(`Fetching student with id=${req.params.id}`);
    const student = await studentModel.getStudentWithMarks(req.params.id);
    if (!student) {
      logger.warn(`Student with id=${req.params.id} not found`);
      return res.status(404).json({ message: 'Student not found' });
    }
    logger.info(`Fetched student with id=${req.params.id}`);
    res.json(student);
  } catch (err) {
    logger.error(`Error fetching student with id=${req.params.id}`, err);
    next(err);
  }
};

exports.updateStudent = async (req, res, next) => {
  try {
    logger.info(`Updating student with id=${req.params.id}`);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.warn('Validation errors', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    logger.info(`Updating student with id=${req.params.id} in database`);
    const student = await studentModel.update(req.params.id, req.body);
    if (!student) {
      logger.warn(`Student with id=${req.params.id} not found`);
      return res.status(404).json({ message: 'Student not found' });
    }
    logger.info(`Updated student with id=${req.params.id}`);
    res.json(student);
  } catch (err) {
    logger.error(`Error updating student with id=${req.params.id}`, err);
    next(err);
  }
};

exports.deleteStudent = async (req, res, next) => {
  try {
    logger.info(`Deleting student with id=${req.params.id}`);
    await studentModel.delete(req.params.id);
    logger.info(`Deleted student with id=${req.params.id}`);
    res.status(204).end();
  } catch (err) {
    logger.error(`Error deleting student with id=${req.params.id}`, err);
    next(err);
  }
};