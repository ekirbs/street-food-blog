// commentRoutes POST

// comment_body: req.body.comment_body,
// post_id: req.params.id,
// post_id: window.location.toString().split("/").length -1,


// postRoutes POST

// const newPost = await Post.create({
//   ...req.body,
//   user_id: req.session.user_id,
// });
// console.log(req.body);

// const newPost = await Post.create(req.body);

  // try {
  //   const newPost = await Post.create(req.body);
  //   console.log(newPost);
  //   console.log(req.body);
  //   req.session.save(() => {
  //     req.session.user_id = newPost.user_id;
  //     req.session.logged_in = true;

  //     res.status(200).json(newPost);
  //   });
  // } catch (err) {
  //   res.status(500).json(err);
  // }


// homeRoutes

// router.get("/profile", (req, res) => {
//   if (req.session.logged_in) {
//     res.redirect("/profile");
//     return;
//   }

//   res.render("login");
// });
