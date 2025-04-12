const markModel = require('../models/markModel');
const { validationResult } = require('express-validator');
const logger = require('../utils/logger');

exports.createMark = async (req, res, next) => {
  try {
    logger.info('Creating mark');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.warn('Validation errors', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    logger.info('Creating mark in database');
    const mark = await markModel.create(req.body);
    logger.info('Mark created successfully');
    res.status(201).json(mark);
  } catch (err) {
    logger.error('Error creating mark', err);
    next(err);
  }
};

exports.getMarksByStudent = async (req, res, next) => {
  try {
    logger.info('Fetching marks for student');
    const marks = await markModel.findByStudent(req.params.id);
    logger.info('Marks fetched successfully');
    res.json(marks);
  } catch (err) {
    logger.error('Error fetching marks', err);
    next(err);
  }
};

exports.getMark = async (req, res, next) => {
  try {
    logger.info('Fetching mark');
    const mark = await markModel.findById(req.params.id);
    if (!mark) {
      logger.warn('Mark record not found');
      return res.status(404).json({ message: 'Mark record not found' });
    }
    logger.info('Mark fetched successfully');
    res.json(mark);
  } catch (err) {
    logger.error('Error fetching mark', err);
    next(err);
  }
};

exports.updateMark = async (req, res, next) => {
  try {
    logger.info('Updating mark');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.warn('Validation errors', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    logger.info('Updating mark in database');
    const mark = await markModel.update(req.params.id, req.body);
    if (!mark) {
      logger.warn('Mark record not found');
      return res.status(404).json({ message: 'Mark record not found' });
    }
    logger.info('Mark updated successfully');
    res.json(mark);
  } catch (err) {
    logger.error('Error updating mark', err);
    next(err);
  }
};

exports.deleteMark = async (req, res, next) => {
  try {
    logger.info('Deleting mark');
    await markModel.delete(req.params.id);
    logger.info('Mark deleted successfully');
    res.status(204).end();
  } catch (err) {
    logger.error('Error deleting mark', err);
    next(err);
  }
};