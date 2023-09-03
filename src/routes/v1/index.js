//External Lib Import
const express = require('express');

//Internal Lib Import
const authRoute = require('./auth.route');
const clientRoute = require('./client.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/client',
    route: clientRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
