// imports
const express = require('express')
const jwt = require('jsonwebtoken')
const db = require('../db/knex')

// variables
const router = express.Router()
const secret = process.env.SECRET

// route handlers
const getData = async (req, res) => {
  try {
    const data = await db('artists')
      .join('photos', 'artists.artistId', 'photos.artistId')
      .orderBy('photos.createdAt', 'desc')
      .select(
        'fname',
        'lname',
        'email',
        'avatar',
        'src',
        'description',
        'alt',
        'likes',
        'createdAt'
      )
    res.status(200).json(data)
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ error, msg: 'Something went wrong while getting photos.' })
  }
}

const putPhoto = async (req, res) => {
  if (!req.body.description) {
    return res.status(400).send('Please provide a photo description.')
  }

  try {
    const isUpdated = await db('photos')
      .where('photoId', req.params.photoId)
      .update(req.body)

    if (isUpdated) {
      const artist = await db('artists')
        .where('artistId', req.decodedToken.subject)
        .first()
      const photos = await db('artists')
        .join('photos', 'artists.artistId', 'photos.artistId')
        .where('artists.artistId', req.decodedToken.subject)
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
        token: req.headers.token,
        artistId: artist.artistId,
        fname: artist.fname,
        lname: artist.lname,
        email: artist.email,
        avatar: artist.avatar,
        photos
      })
    } else
      res.status(400).json({ msg: 'Failed to update the photo description.' })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      msg: 'Something went wrong while updating the photo description.'
    })
  }
}

// middleware
const authenticate = async (req, res, next) => {
  try {
    const photo = await db('photos')
      .join('artists', 'artists.artistId', 'photos.artistId')
      .where('photos.photoId', req.params.photoId)
      .first()

    if (photo) {
      jwt.verify(req.headers.token, secret, (error, decodedToken) => {
        if (error) {
          res
            .status(401)
            .json({ msg: 'You are not permitted to edit this photo.' })
        } else {
          // console.log('decodedToken', decodedToken)
          req.decodedToken = decodedToken
          decodedToken.subject === photo.artistId
            ? next()
            : res
                .status(401)
                .json({ msg: 'You are not permitted to edit this photo.' })
        }
      })
    } else res.status(404).json({ msg: `Fotograph doesn't have this photo!` })
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ msg: 'Something went wrong while verifying your credentials.' })
  }
}

// routes
router.get('/', getData)
router.put('/:photoId', authenticate, putPhoto)

// export
module.exports = router
