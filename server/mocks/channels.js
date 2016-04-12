/*jshint node:true*/
module.exports = function(app) {
  var express = require('express');
  var channelsRouter = express.Router();

  channelsRouter.get('/', function(req, res) {
    res.send({
      'channels': [
        {id: 1, name: "My Cards", parent_id: null},
        {id: 2, name: "Art", parent_id: null},
        {id: 3, name: "Design", parent_id: null},
        {id: 4, name: "Interior Design", parent_id: 3},
        {id: 5, name: "Modular Design", parent_id: 3},
        {id: 6, name: "Ceramics", parent_id: 2},
        {id: 7, name: "Photography", parent_id: 2}
      ]
    });
  });

  channelsRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  channelsRouter.get('/:id', function(req, res) {
    res.send({
      'channels': {
        id: req.params.id
      }
    });
  });

  channelsRouter.put('/:id', function(req, res) {
    res.send({
      'channels': {
        id: req.params.id
      }
    });
  });

  channelsRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  // The POST and PUT call will not contain a request body
  // because the body-parser is not included by default.
  // To use req.body, run:

  //    npm install --save-dev body-parser

  // After installing, you need to `use` the body-parser for
  // this mock uncommenting the following line:
  //
  //app.use('/api/channels', require('body-parser').json());
  app.use('/api/channels', channelsRouter);
};
