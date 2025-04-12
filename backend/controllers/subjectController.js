const subjectModel = require('../models/subjectModel');
const { validationResult } = require('express-validator');
const logger = require('../utils/logger');

exports.createSubject = async (req, res, next) => {
  try {
    logger.info('Creating a new subject');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error('Validation errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const subject = await subjectModel.create(req.body);
    logger.info('Subject created successfully');
    res.status(201).json(subject);
  } catch (err) {
    logger.error('Error creating subject:', err);
    next(err);
  }
};

exports.getAllSubjects = async (req, res, next) => {
  try {
    logger.info('Retrieving all subjects');
    const subjects = await subjectModel.findAll();
    logger.info('Subjects retrieved successfully');
    res.json(subjects);
  } catch (err) {
    logger.error('Error retrieving subjects:', err);
    next(err);
  }
};

exports.getSubjectById = async (req, res, next) => {
  try {
    logger.info(`Retrieving subject by ID: ${req.params.id}`);
    const subject = await subjectModel.findById(req.params.id);
    if (!subject) {
      logger.error(`Subject not found: ${req.params.id}`);
      return res.status(404).json({ message: 'Subject not found' });
    }
    logger.info('Subject retrieved successfully');
    res.json(subject);
  } catch (err) {
    logger.error(`Error retrieving subject by ID: ${req.params.id}`, err);
    next(err);
  }
};

exports.updateSubject = async (req, res, next) => {
  try {
    logger.info(`Updating subject by ID: ${req.params.id}`);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error('Validation errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const subject = await subjectModel.update(req.params.id, req.body);
    if (!subject) {
      logger.error(`Subject not found: ${req.params.id}`);
      return res.status(404).json({ message: 'Subject not found' });
    }
    logger.info('Subject updated successfully');
    res.json(subject);
  } catch (err) {
    logger.error(`Error updating subject by ID: ${req.params.id}`, err);
    next(err);
  }
};

exports.deleteSubject = async (req, res, next) => {
  try {
    logger.info(`Deleting subject by ID: ${req.params.id}`);
    await subjectModel.delete(req.params.id);
    logger.info('Subject deleted successfully');
    res.status(204).end();
  } catch (err) {
    logger.error(`Error deleting subject by ID: ${req.params.id}`, err);
    next(err);
  }
};