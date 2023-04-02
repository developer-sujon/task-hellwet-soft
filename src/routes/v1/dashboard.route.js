//Internal Lib Import
const express = require('express');

//External Lib Import
const { auth, roles } = require('../../middlewares/auth');
const dashboardController = require('../../controllers/dashboard.controller');
const { roles: allRoles } = require('../../config/roles');

const router = express.Router();

router.get('/dashboardSummary', auth(), roles(allRoles), dashboardController.dashboardSummary);

module.exports = router;
