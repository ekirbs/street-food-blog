const { User } = require("../models");

const userData = [
  {
    "username": "Lauren Ipsum",
    "email": "holder@aol.com",
    "password": "password1234"
  },
  {
    "username": "Hackerman",
    "email": "kung_fury@gmail.com",
    "password": "rootroot1234"
  },
  {
    "username": "Chewy Louie",
    "email": "dotGrail@hotmail.com",
    "password": "Passw0rd!!"
  },
  {
    "username": "jayQuery99",
    "email": "jqAdmin@gmail.com",
    "password": "${passwordRoot}"
  }
];

const userPosts = () => User.bulkCreate(userData, {
  indivuidualhooks: true,
  returning: true,
});

module.exports = userPosts;