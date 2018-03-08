const db = require('./server/db');
const User = db.models.user;
const Game = db.models.game;

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
   name: 'chimac',
   score: 45,
   level: 'Level1',
   userId: 1
  },
  {
    name: 'chimac',
    score: 100,
    level: 'Level2',
    userId: 1
  },
  {
    name: 'chimac',
    score: 90,
    level: 'Level2',
    userId: 2
   },
   {
    name: 'chimac',
    score: 150,
    level: 'Level3',
    userId: 3
   },
   {
    name: 'chimac',
    score: 70,
    level: 'Level2',
    userId: 3
   },
   {
    name: 'chimac',
    score: 30,
    level: 'Level1',
    userId: 3
   },
   {
    name: 'chimac',
    score: 100,
    level: 'Level2',
    userId: 4
   },
]

const seed = () => {
  Promise.all(users.map( aUser => User.create(aUser)))
    .then( ()=> {
      Promise.all(games.map( aGame => Game.create(aGame)))
    })
}

const main = () => {
  console.log('Syncing the db');
  db.sync({force: true})
    .then( () => {
      console.log('seeding the db');
      return seed()
    })
    .catch( err => {
      console.log('error while seeding!')
      console.log(err)
    })
    .then( () => {
      db.close();
      return null;
    })
}
