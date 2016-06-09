// Debugging
var bug = require('debug')
var debug = bug('rockit-express:api:owner')

// Database
var db = require('../../lib/db')

// Router
var express = require('express')
var router = express.Router()

// Utility for changing case
var changeCase = require('../../lib/change-case')





// Create a user
router.post('/', function(req, res) {
  //debug('POST' +  req.path + ',' + req.body)
  var values = changeCase(req.body)

  db.insert('owner', values, function(error, id) {
    if (error) {
      debug('DB Error', error)
      return res.status(500).send({ error })
    }

    // Make a URL string
    var uri = req.originalUrl + '/' + id;

    values.owner_id = id;

    res.cookie('user', values)


    // Redirect
    res.redirect('/#/dogs/add');

  })

})

module.exports = router
