const db = require('./server/db');
const User = db.model('user');
const Game = db.model('game');


const users = [
  {
   firstName: 'Claudia',
   lastName: 'Baik',
   isAdmin: true,
   email: 'cb@chimac.com',
   password: '111'
  },
  {
   firstName: 'Eunji',
   lastName: 'Song',
   isAdmin: true,
   email: 'es@chimac.com',
   password: '222'
  },
  {
   firstName: 'John',
   lastName: 'Mac',
   email: 'jm@chimac.com',
   password: '333',
  },
  {
   firstName: 'Kristen',
   lastName: 'Chi',
   email: 'kc@chimac.com',
   password: '444'
  }
]

const games = [
  {
   score: 45,
   level: 'Level1',
   userId: 1
  },
  {
    score: 100,
    level: 'Level2',
    userId: 1
  },
  {
    score: 90,
    level: 'Level2',
    userId: 2
   },
   {
    score: 150,
    level: 'Level3',
    userId: 3
   },
   {
    score: 70,
    level: 'Level2',
    userId: 3
   },
   {
    score: 30,
    level: 'Level1',
    userId: 3
   },
   {
    score: 100,
    level: 'Level2',
    userId: 4
   },
]

const seed = () =>
  Promise.all(users.map(user => User.create(user)))
  .then(() =>
    Promise.all(games.map(game => Game.create(game)))
  )

const main = () => {
  console.log('Syncing the db');
  db.sync({ force: true })
  .then(() => {
    console.log('Seeding the db');
    return seed();
  })
  .catch(err => {
    console.log('Error while seeding');
    console.log(err);
  })
  .then(() => {
    db.close();
    return null;
  });
};

main();
