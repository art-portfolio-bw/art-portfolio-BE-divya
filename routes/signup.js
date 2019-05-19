// imports
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// const db = require('../db/knex')
const startCase = require('lodash/startCase')
const toLower = require('lodash/toLower')

// variables
const router = express.Router()
const secret = process.env.SECRET

// route handlers
const signup = async (req, res) => {
  if (!req.body.fname)
    return res.status(422).json({
      msg: 'Your first name is required to signup.'
    })

  if (!req.body.lname)
    return res.status(422).json({
      msg: 'Your last name is required to signup.'
    })

  if (!req.body.email)
    return res.status(422).json({
      msg: 'Please provide your email address.'
    })

  if (!req.body.password)
    return res.status(422).json({
      msg: 'A password is required to signup.'
    })

  try {
    // hash the original password, then hash the hash 2^10 times
    const hash = await bcrypt.hashSync(req.body.password, 10)
    const artist = { ...req.body, password: hash }
    const token = generateToken(artist)
    // await db('artists').insert(artist)
    res.status(201).json({ msg: `Welcome, ${artist.fname}!`, token })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      msg: `Something went wrong while signing you up!`,
      error
    })
  }
}

// middleware
const startCaseName = (req, res, next) => {
  req.body.fname = startCase(toLower(req.body.fname))
  req.body.lname = startCase(toLower(req.body.lname))
  next()
}

// helpers
const generateToken = artist => {
  const payload = {
    // subject: artist.artistId,
    fname: artist.fname,
    lname: artist.lname
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
