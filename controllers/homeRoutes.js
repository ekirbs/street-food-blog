const router = require('express').Router();
const { User, Post, Comment } = require('../models');
// const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  console.log('GET /');
  try {
    const dbPostData = await Post.findAll({
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

    const posts = dbPostData.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in,
      // username: req.session.username,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  console.log(req.params.id);
  try {
    const postData = await Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        "id",
        "title",
        "post_body",
        "created_at"
      ],
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

    // const post = dbPostData.map((post) => post.get({ plain: true }));
    const post = postData.get({ plain: true });

    res.render('homepage', {
      post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

router.get('/profile', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;