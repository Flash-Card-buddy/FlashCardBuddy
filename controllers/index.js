const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');
const deckRoutes = require('./api/deck-routes');
const cardHtmlRoutes = require('./card-html-routes');

router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);
router.use('/deck', deckRoutes);
router.use('/card', cardHtmlRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;