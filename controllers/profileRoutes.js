const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");
// actually /profile
router.get("/", withAuth, async (req, res) => {
  console.log("GET all posts on dashboard");
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id
      },
      attributes: [
        "id",
        "title",
        "post_body",
        "user_id",
        "created_at",
      ],
      order: [[
        "created_at",
        "DESC",
      ]],
      include: [
        {
          model: User,
          attributes: [
            "username",
          ],
        },
        {
          model: Comment,
          attributes: [
            "id",
            "comment_body",
            "post_id",
            "user_id",
            "created_at",
          ],
          order: [[
            "created_at",
            "DESC",
          ]],
          include: {
            model: Post,
            attributes: [
              "title",
            ],
          },
          include: {
            model: User,
            attributes: [
              "username",
            ],
          },
        },
      ],
    });

    // console.log(postData);
    const posts = postData.map((post) => post.get({ plain: true }));
    // console.log(posts);

    res.render("profile", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get("/edit/:id", withAuth, async (req, res) => {
router.get("/post/:id", withAuth, async (req, res) => {
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
        "user_id",
        "created_at",
      ],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: [
            "id",
            "comment_body",
            "post_id",
            "user_id",
            "created_at",
          ],
          order: [[
            "created_at",
            "DESC",
          ]],
          include: {
            model: User,
            attributes: [
              "username",
            ],
          },
        },
      ],
    });

    // const post = dbPostData.map((post) => post.get({ plain: true }));
    const post = postData.get({ plain: true });

    res.render("post", {
      post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  };
});

// profile/editPost/:id
router.get("/editPost/:id", withAuth, async (req, res) => {
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
        "user_id",
        "created_at",
      ],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: [
            "id",
            "comment_body",
            "post_id",
            "user_id",
            "created_at",
          ],
          order: [[
            "created_at",
            "DESC",
          ]],
          include: {
            model: User,
            attributes: [
              "username",
            ],
          },
        },
      ],
    });

    // const post = dbPostData.map((post) => post.get({ plain: true }));
    const post = postData.get({ plain: true });

    res.render("editPost", {
      post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  };
});

router.get("/editUser/:id", withAuth, async (req, res) => {
  console.log("GET/ in profile routes for editUser")
  console.log(req.params.id);
  try {
    const userData = await User.findOne({
      where: {
        id: req.params.id,
      },
      attributes: {
        exclude: ["password"],
      },
    });

    const user = userData.get({ plain: true });
    console.log(userData);

    res.render("editUser", {
      user,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  };
});

// router.get('*', (req, res) =>
// res.render('404')
// );

module.exports = router;