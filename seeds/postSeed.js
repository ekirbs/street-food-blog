const { Post } = require("../models");

const postData = [
  {
    "title": "File structure is important",
    "post_body": "A properly organized file structure will allow yourself and others to more easily navigate the application!",
    "user_id": 2
  },
  {
    "title": "Google Everything",
    "post_body": "Google every question you have.  Everything is on the internet!",
    "user_id": 3
  },
  {
    "title": "Encryption",
    "post_body": "Encrypting your passwords is an important security measure to deter hackers form accessing sensitive files.",
    "user_id": 4
  },
  {
    "title": "Powergloves",
    "post_body": "Everyone knows that to reach your maximum hacking potential, you need a Powerglove!",
    "user_id": 2
  }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;