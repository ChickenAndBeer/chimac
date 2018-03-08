const router = require('express').Router();
const {Game, User} = require('../db/models');
module.exports = router;

// GET /games ------- ALL GAMES
router.get( '/', (req, res, next) => {
  Game.findAll()
    .then( games => res.json(games))
    .catch(next)
})

// GET /games/:gameId ------- SINGLE GAME
router.get('/:gameId', (req, res, next)=>{
  Game.findById(req.params.gameId,
    { include: [{model: User, as: "user"}] })
    .then( game => res.json(game))
    .catch(next)
})

// GET /games/users/:userId ------- ALL games for a singleUser.
// couldn't get it done in api/user.js since user doens't have gameId
router.get('/users/:userId', (req, res, next) => {
  Game.findAll({ where: { userId: req.params.userId }})
    .then( games => res.json(games))
    .catch(next)
})

// POST /games ------- CREATE A GAME
router.post('/', (req, res, next) => {
  Game.create(req.body)
    .then( created => res.status(204).json(created))
    .catch(next)
})

// PUT /games/:gameId ------- UPDATE A GAME
router.put('/:gameId', (req, res, next) => {
  Game.update(req.body, {
    where: { id: req.params.gameId}, returning: true
  })
    .then(([_, updated]) => res.status(204).json(updated[0]))
    .catch(next)
})

// DELETE /games/:gameId ------- DELETE A GAME
router.delete('/:gameId', (req, res, next) => {
  Game.destroy({ where: { id: req.params.gameId }})
    .then( () => res.sendStatus(204))
    .catch(next)
})
