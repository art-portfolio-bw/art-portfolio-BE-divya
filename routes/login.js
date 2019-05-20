// imports
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../db/knex')

// variables
const router = express.Router()
const secret = process.env.SECRET

// route handlers
const login = async (req, res) => {
  if (!req.body.email)
    return res.status(422).json({
      msg: 'Please provide your email address to login.'
    })

  if (!req.body.password)
    return res.status(422).json({
      msg: 'Your password is required to login.'
    })

  try {
    const artist = await db('artists')
      .where('email', req.body.email)
      .first()

    if (artist) {
      const isAuthenticated = await bcrypt.compareSync(
        req.body.password,
        artist.password
      )
      if (isAuthenticated) {
        const token = generateToken(artist)
        const photos = await db('artists')
          .join('photos', 'artists.artistId', 'photos.artistId')
          .where('artists.artistId', artist.artistId)
          .select(
            'photos.photoId',
            'src',
            'description',
            'alt',
            'likes',
            'createdAt'
          )
        res.status(200).json({
          msg: `Welcome back, ${artist.fname}!`,
          token,
          artistId: artist.artistId,
          fname: artist.fname,
          lname: artist.lname,
          email: artist.email,
          avatar: artist.avatar,
          photos
        })
      } else
        res
          .status(401)
          .send(`Uh, oh! Either your email or password is incorrect.`)
    } else {
      res.status(400).send(`You have not yet signed-up with us!`)
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({
      error,
      msg: `Something went wrong while logging you in.`
    })
  }
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
router.post('/', login)

// export
module.exports = router
