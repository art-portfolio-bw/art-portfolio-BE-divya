// imports
const express = require('express')
const bcrypt = require('bcrypt')
const db = require('../db/knex')
const generateToken = require('../helpers/generateToken')

// variables
const router = express.Router()

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
          .orderBy('photos.createdAt', 'desc')
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
      res.status(404).send(`You have not yet signed-up with us!`)
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({
      error,
      msg: `Something went wrong while logging you in.`
    })
  }
}

// routes
router.post('/', login)

// export
module.exports = router
