// imports
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// const db = require('../db/knex')
const startCase = require('lodash/startCase')
const lowerCase = require('lodash/lowerCase')

const app = express()
app.use(express.json()) // parses incoming data

// variables
const router = express.Router()
const secret = process.env.SECRET

// route handlers
const signup = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password)
    return res.status(422).json({
      msg: 'Your name, email and password are required to signup.'
    })

  try {
    // hash the original password, then hash the hash 2^10 times
    const hash = await bcrypt.hashSync(req.body.password, 10)
    const artist = { ...req.body, password: hash }
    const token = generateToken(artist)
    // await db('artists').insert(artist)
    res.status(201).json({ msg: `Welcome, ${artist.name}!`, token })
  } catch (error) {
    res.status(500).json({
      msg: `Something went wrong while signing-up ${artist.name}.`,
      error
    })
  }
}

// middleware
const startCaseName = (req, res, next) => {
  req.body.name = startCase(lowerCase(req.body.name))
  next()
}

// helpers
const generateToken = artist => {
  const payload = {
    // subject: artist.artistId,
    name: artist.name
  }
  const options = {
    expiresIn: '7d' // 7 days
  }
  return jwt.sign(payload, secret, options)
}

// routes
router.post('/', startCaseName, signup)

// export
module.exports = router
