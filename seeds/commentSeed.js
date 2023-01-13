const { Comment } = require("../models");

const commentData = [
  {
    "comment_body": "I agree! A good file structure is also really helpful when building an application!",
    "user_id": 3,
    "post_id": 1
  },
  {
    "comment_body": "I found this blog through googling.",
    "user_id": 2,
    "post_id": 2
  },
  {
    "comment_body": "Hackerman has hacked time again...",
    "user_id": 4,
    "post_id": 4
  },
  {
    "comment_body": "What did you google?",
    "user_id": 4,
    "post_id": 2
  }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;