const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: {
        exclude: ["password"],
      },
      order: [
        "created_at",
        "DESC",
      ],
  });
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", withAuth, async (req, res) => {
  try {
    const commentData = await User.findOne({
      attributes: {
        exclude: ["password"],
      },
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
      include: [
        {
          model: Post,
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
            model: Post,
            attributes: [
              "title",
            ],
          },
        },
      ],
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again!" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again!" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: "You are now logged in!!" });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
