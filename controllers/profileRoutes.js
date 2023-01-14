const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  console.log('GET /profile');
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id
      },
      attributes: [
        "id",
        "title",
        "post_body",
        "created_at"
      ],
      order: [[ 'created_at', 'DESC']],
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: ['id', 'comment_body', "post_id", "user_id", "created_at"],
          order: [[ 'created_at', 'DESC']],
          include: {
            model: User,
            attributes: ["username"]
          }
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('profile', { posts, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;