const router = require('express').Router();

const userRoutes = require('./user-routes');
const deckRoutes = require('./deck-routes');
const cardRoutes = require('./card-routes')
// Will we use comments?
const commentRoutes = require('./comment-routes');

router.use('/users', userRoutes);
router.use('/deck', deckRoutes);
router.use('/comments', commentRoutes);
router.use('/cards', cardRoutes);

module.exports = router;
