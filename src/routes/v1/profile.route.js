//Internal Lib Import
const express = require('express');

//External Lib Import
const { auth, roles } = require('../../middlewares/auth');
const { profileController } = require('../../controllers');
const { roles: allRoles } = require('../../config/roles');

const router = express.Router();

router.get('/profileDetails', auth(), roles(allRoles), profileController.profileDetails);

module.exports = router;
