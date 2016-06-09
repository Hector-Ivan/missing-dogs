import bug from 'debug'
const debug = bug('rockit-express:auth')

import dotty from 'dotty'
import db from '../lib/db'
import changeCase from '../lib/change-case'

import express from 'express'
const router = express.Router()

router.post('/login', function (req, res) {
  const payload = dotty.get(req, 'body')
	debug(`POST ${req.path}`, payload)

  db.select('SELECT * FROM owner WHERE email=:email AND password=:password', payload, (error, rows) => {
    if (error) {
      return res.redirect('/#/login?fail')
      // return res.status(500).send({ error })
    }

    if (rows.length) {
      req.session.loggedIn = true
      req.session.user = rows[0]
      res.cookie('user', rows[0])
      res.redirect('/')
    } else {
      res.redirect('/#/login?fail')
    }

  })
})

router.get('/logout', function (req, res) {
  delete req.session.user
  req.session.loggedIn = false
  res.clearCookie('user')
  res.redirect('http://localhost:3000')
})

export default router