//Internal Lib Import
const express = require('express');

//External Lib Import
const { auth, roles } = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const taskValidation = require('../../validations/task.validation');
const taskController = require('../../controllers/task.controller');
const { roles: allRoles } = require('../../config/roles');

const router = express.Router();

router.post('/taskCreate', auth(), roles(allRoles), validate(taskValidation.taskCreate), taskController.taskCreate);

router.get('/taskList', auth(), roles(allRoles), taskController.taskList);
router.get('/taskdropDown', auth(), roles(allRoles), taskController.taskDropDown);

router.get('/taskDetails/:id', auth(), roles(allRoles), validate(taskValidation.taskDetails), taskController.taskDetails);

router.patch('/taskUpdate/:id', auth(), roles(allRoles), validate(taskValidation.taskUpdate), taskController.taskUpdate);

router.delete('/taskDelete/:id', auth(), roles(allRoles), validate(taskValidation.taskDelete), taskController.taskDelete);

module.exports = router;
