// imports
const express = require('express')
const db = require('../db/knex')

// variables
const router = express.Router()

// route handlers
const getArtistById = async (req, res) => {
  try {
    const artist = await db('artists')
      .where('artistId', req.params.artistId)
      .first()
    const photos = await db('artists')
      .join('photos', 'artists.artistId', 'photos.artistId')
      .where('artists.artistId', req.params.artistId)
      .orderBy('photos.createdAt', 'desc')
      .select(
        'photos.photoId',
        'src',
        'description',
        'alt',
        'likes',
        'createdAt'
      )
    !photos.length
      ? res
          .status(404)
          .json({ msg: 'This artist has not yet signed-up with Fotograph!' })
      : res.status(200).json({
          artistId: artist.artistId,
          fname: artist.fname,
          lname: artist.lname,
          email: artist.email,
          avatar: artist.avatar,
          photos
        })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      error,
      msg: `Something went wrong while getting the artist.`
    })
  }
}

// routes
router.get('/artists/:artistId', getArtistById)

// export
module.exports = router
