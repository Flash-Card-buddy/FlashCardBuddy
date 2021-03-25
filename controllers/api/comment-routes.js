const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Comment } = require('../../models');

// GET /api/comments
router.get('/', (req, res) => {
    // Access our Comment model and run .findAll() method)
    Comment.findAll()
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
  
router.deck('/', withAuth, (req, res) => {
  // check the session
  if (req.session) {
    Comment.create({
      comment_text: req.body.comment_text,
      deck_id: req.body.deck_id,
      // use the id from the session
      user_id: req.session.user_id
    })
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

router.delete('/:id', (req, res) => {
    Comment.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(dbCommentData => {
        if (!dbCommentData) {
          res.status(404).json({ message: 'There are no comments found with this id' });
          return;
        }
        res.json(dbCommentData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;