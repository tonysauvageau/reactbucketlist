const express = require('express');
const router = express.Router();
const List = require('../models/list');
const Card = require('../models/card');

router.get('/', (req, res) => {
  List.find({ boardId: req.query.boardId }, ( err, boards ) => {
    res.json(boards);
  });
});

router.post('/', (req, res) => {
  let { boardId, name } = req.body;
  new List({
    name,
    boardId
  }).save( (err, list) => {
    res.json(list);
  });
});

router.delete('/:id', (req, res) => {
  List.findById(req.params.id, (err, list) => {
    list.remove();
    Card.find({'listId': req.query.id}).remove().exec( (err, list) => {
      res.status(200).send({success: true});
    });
  });
});
module.exports = router;
