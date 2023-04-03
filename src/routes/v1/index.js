//External Lib Import
const express = require('express');

//Internal Lib Import
const authRoute = require('./auth.route');
const profileRoute = require('./profile.route');
const taskRoute = require('./task.route');
const dashboardRoute = require('./dashboard.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/profile',
    route: profileRoute,
  },
  {
    path: '/task',
    route: taskRoute,
  },
  {
    path: '/dashboard',
    route: dashboardRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
