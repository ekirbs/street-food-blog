const sequelize = require('../config/connection');

const seedUsers = require('./userSeed.js');
const seedPosts = require('./postSeed.js');
const seedComments = require('./commentSeed.js');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await seedUsers();

  await seedPosts();

  await seedComments();

  process.exit(0);
};

seedDatabase();
