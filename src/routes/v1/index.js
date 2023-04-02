//External Lib Import
const express = require('express');

//Internal Lib Import
const authRoute = require('./auth.route');
const taskRoute = require('./task.route');
const dashboardRoute = require('./dashboard.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
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
