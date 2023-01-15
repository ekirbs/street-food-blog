const { Post } = require("../models");

const postData = [
  {
    "title": "Ea(t) a(t) (J)oe's!",
    "post_body": "Don't mind the half burned-out neon sign above the cart, the food there is amazing!",
    "user_id": 1
  },
  {
    "title": "Kibbeh & Kebabs",
    "post_body": "The best arabic food you can find out there!",
    "user_id": 3
  },
  {
    "title": "What is Halal?",
    "post_body": "I saw a lot of people around a halal vendor the other day, but I've never had it before.  What is it?",
    "user_id": 4
  },
  {
    "title": "Hotdogs",
    "post_body": "This new hotdog cart on 5th Ave has amazing food!  And he must have scared away all the stray cats that used to live here!! Double win.",
    "user_id": 3
  }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;