const { User } = require("../models");

const userData = [
  {
    "username": "hrPufnstuf",
    "email": "puffy@aol.com",
    "password": "Password1234",
  },
  {
    "username": "Hackerman",
    "email": "kung_fury@gmail.com",
    "password": "RootRoot1234",
  },
  {
    "username": "foodfan98",
    "email": "dotGrail@hotmail.com",
    "password": "Passw0rd!!",
  },
  {
    "username": "jayQuery99",
    "email": "codeHumor@gmail.com",
    "password": "${passwordRoot}",
  }
];

const userPosts = () => User.bulkCreate(userData, {
  indivuidualhooks: true,
  returning: true,
});

module.exports = userPosts;