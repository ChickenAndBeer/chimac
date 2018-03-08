const router = require('express').Router();
const {User} = require('../db/models')
module.exports = router;

//  GET /user ------- ALL USER
router.get('/', (req, res, next)=>{
  User.findAll() // eager loading??
    .then( users => res.json(users))
    .catch(next)
})

// GET /user/:userId ------- SINGLE USER
router.get('/:userId', (req, res, next)=>{
  User.findById(req.params.userId) // eager loading??
    .then( user => res.json(user))
    .catch(next)
})

// POST /user ------- CREATE A USER
router.post('/', (req, res, next)=>{
  User.create(req.body)
    .then( created => res.status(204).json(created))
    .catch(next)
})

// PUT /user/:userId ------- UPDATE A USER
router.put('/:userId', (req, res, next)=>{
  User.update(req.body, { where: { id: req.params.userId}, returning: true })
    .then(([_, updated]) => res.status(204).json(updated[0]))
    .catch(next)
})

// DELETE /user/:userId ------- DELETE A USER
router.delete('/:userId', (req, res, next)=>{
  User.destory({ where: { id: req.params.userId }})
    .then( () => res.sendStatus(204))
    .catch(next)
})
