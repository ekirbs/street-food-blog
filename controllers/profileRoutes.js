const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  console.log('GET /');
  try {
    const dbPostData = await Post.findAll({
      where: {
        user_id: req.session.user_id
      },
      attributes: [
        "id",
        "title",
        "post_body"
      ],
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: ['id', 'comment_body', "post_id", "user_id"],
          include: {
            model: User,
            attributed: ["username"]
          }
        },
      ],
    });

    const posts = dbPostData.map((post) => post.get({ plain: true }));

    res.render('dashboard', { 
      posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

module.exports = router;