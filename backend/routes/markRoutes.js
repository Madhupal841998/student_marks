const express = require('express');
const router = express.Router();
const markController = require('../controllers/markController');
const { validateMark } = require('../middlewares/validation');

router.post('/', validateMark, markController.createMark);
router.get('/student/:id', markController.getMarksByStudent);
router.put('/:id', validateMark, markController.updateMark);
router.delete('/:id', markController.deleteMark);
router.get('/:id', markController.getMark);

module.exports = router;