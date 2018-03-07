const Sequelize = require('sequelize')
const db = require('../db')

const Game = db.define('game', {
  name:  {
    type: Sequelize.STRING,
    defaultValue: "ChickenAndBeer"
  },
  score: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  level: {
    type: Sequelize.ENUM('Level1', 'Level2', 'Level3')
  }
})

module.exports = Game
