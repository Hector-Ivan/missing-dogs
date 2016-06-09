// Debugging
var bug = require('debug')
var debug = bug('rockit-express:api:user')

// Database
var db = require('../../lib/db')

// Router
var express = require('express')
var router = express.Router()

// Utility for changing case
var changeCase = require('../../lib/change-case')

router.delete('/:id', function(req, res){
  if (!req.session.user) {
    return res.status(401).send()
  }
  db.selectFile('delete-dog', { id: req.params.id }, function(error, id) {
    if (error) {
      return res.status(500).send({ error })
    }

    res.json(id)
  })
});

module.exports = router