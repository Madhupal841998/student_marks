const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subjectController');
const { validateSubject } = require('../middlewares/validation');

router.post('/', validateSubject, subjectController.createSubject);
router.get('/', subjectController.getAllSubjects);
router.get('/:id', subjectController.getSubjectById);
router.put('/:id', validateSubject, subjectController.updateSubject);
router.delete('/:id', subjectController.deleteSubject);

module.exports = router;