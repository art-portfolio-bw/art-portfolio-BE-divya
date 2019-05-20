// imports
const express = require('express')
const knex = require('../db/knex')

// variables
const router = express.Router()

// route handlers
const getData = async (req, res) => {
  try {
    const data = await knex('artists')
      .join('photos', 'artists.artistId', 'photos.artistId')
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

// routes
router.get('/', getData)

// export
module.exports = router
