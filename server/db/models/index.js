const User = require('./user')
const Game = require('./game')

//Association
User.hasMany(Game)  //Game hasMany userID
//Game.hasMany(User)  //User has many gameID
//User.belongsTo(Game)
Game.belongsTo(User)


module.exports = {
  User,
  Game
}
