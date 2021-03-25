const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');
const deckRoutes = require('./api/deck-routes');
const cardRoutes = require('./api/card-routes');

router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);
router.use('/deck', deckRoutes);
router.use('/card', cardRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;