const { Comment } = require("../models");

const commentData = [
  {
    "comment_body": "I agree! The food there is amazing!",
    "user_id": 3,
    "post_id": 1
  },
  {
    "comment_body": "I found this location to be a great spot for kebabs.",
    "user_id": 4,
    "post_id": 2
  },
  {
    "comment_body": "Dont trust the meat...",
    "user_id": 4,
    "post_id": 4
  },
  {
    "comment_body": "<What year is this?>",
    "user_id": 2,
    "post_id": 1
  }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;