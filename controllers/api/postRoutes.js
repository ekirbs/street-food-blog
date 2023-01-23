const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: [
        "id",
        "title",
        "post_body",
        "user_id",
        "created_at",
      ],
      order: [
        "created_at",
        "DESC",
      ],
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
            "comment-body",
            "post_id",
            "user_id",
            "created_at",
          ],
          order: [
            "created_at",
            "DESC",
          ],
          include: {
            model: User,
            attributes: [
              "username",
            ],
          },
        },
      ],
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err); // 400 vs 500?
  }
});

router.get("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: [
        "id",
        "title",
        "post_body",
        "user_id",
        "created_at",
      ],
      order: [
        "created_at",
        "DESC",
      ],
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
            "comment-body",
            "post_id",
            "user_id",
            "created_at",
          ],
          order: [
            "created_at",
            "DESC",
          ],
          include: {
            model: User,
            attributes: [
              "username",
            ],
          },
        },
      ]
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err); // 400 vs 500?
  }
});
// actually /api/posts
router.post("/", withAuth, async (req, res) => {
  // console.log("Creating post");
  try {
    // console.log("inside post try")
    const newPost = await Post.create({
      title: req.body.title,
      post_body: req.body.post_body,
      user_id: req.session.user_id,
    });
    // console.log("through post try.");
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err); // 400 vs 500?
  }
});

router.put("/", withAuth, async (req, res) => {
  // console.log("Creating post");
  try {
    // console.log("inside put try")
    // console.log(req.body);
    
    const editedPost = await Post.update({
      where: {
        id: req.params.id,
      },
    },
    {
      title: req.body.title,
      post_body: req.body.post_body,
    },
    );
    // console.log("through put try.");
    // console.log(editedPost);
    res.status(200).json(editedPost);
  } catch (err) {
    res.status(400).json(err); // 400 vs 500?
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
