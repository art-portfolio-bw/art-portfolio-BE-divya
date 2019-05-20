// imports
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../db/knex')
const faker = require('faker')
const startCase = require('lodash/startCase')
const toLower = require('lodash/toLower')
const getPhotos = require('../unsplash')

// variables
const router = express.Router()
const secret = process.env.SECRET
const url =
  'https://api.unsplash.com/search/photos?query=experimental&orientation=landscape'

// route handlers
const signup = async (req, res) => {
  if (!req.body.fname)
    return res.status(422).json({
      msg: 'Your first name is required to signup.'
    })

  if (!req.body.email)
    return res.status(422).json({
      msg: 'Please provide your email address for signup.'
    })

  if (!req.body.password)
    return res.status(422).json({
      msg: 'A password is required to signup.'
    })

  try {
    // hash the original password, then hash the hash 2^10 times
    const hash = await bcrypt.hashSync(req.body.password, 10)
    const artist = {
      ...req.body,
      password: hash,
      artistId: faker.random.uuid()
    }
    const token = generateToken(artist)
    const newArtist = await db('artists').insert(artist, [
      'artistId',
      'fname',
      'lname',
      'email',
      'avatar'
    ])

    const data = await getPhotos(url)
    
    const photos = data.map(photo => ({
      src: photo.src,
      description: photo.description,
      alt: photo.alt,
      likes: photo.likes,
      createdAt: photo.createdAt,
      artistId: newArtist[0].artistId
    }))

    const newPhotos = await db('photos').insert(photos, [
      'photoId',
      'src',
      'description',
      'alt',
      'likes',
      'createdAt'
    ])

    res.status(201).json({
      msg: `Welcome, ${newArtist[0].fname}!`,
      token,
      ...newArtist[0],
      photos: newPhotos
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      msg:
        error.code === '23505'
          ? `You're already signed-up with us! Please login instead.`
          : `Something went wrong while signing you up!`,
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
    subject: artist.artistId,
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
