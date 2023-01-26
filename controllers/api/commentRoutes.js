const router = require("express").Router();
const { User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      attributes: [
        "id",
        "comment_body",
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
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err); // 400 vs 500?
  }
});

router.get("/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.findOne({
      where: {
        id: req.params.id,
      },
      attributes: [
        "id",
        "comment_body",
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
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err); // 400 vs 500?
  }
});

router.post("/", withAuth, async (req, res) => {
  console.log("Creating comment");
  try {
    console.log("Inside comment post try");
    console.log(req.body);
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    console.log(newComment);

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err); // 400 vs 500?
  }
});

router.put("/:id", withAuth, async (req, res) => {
  console.log(req.body)
  try {   
    const [editedComment] = await Comment.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    console.log(editedComment);
    res.status(200).json(editedComment);
  } catch (err) {
    res.status(400).json(err); // 400 vs 500?
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: "No comment found with this id!" });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
