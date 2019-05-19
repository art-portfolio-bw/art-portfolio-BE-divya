// imports
const express = require('express')
const axios = require('axios')

// variables
const router = express.Router()
const key = process.env.UNSPLASH_KEY

// route handlers

// routes
const getPhotos = async (req, res) => {
  try {
    const options = {
      headers: {
        Authorization: `Client-ID ${key}`
      }
    }
    const response = await axios.get(
      'https://api.unsplash.com/search/photos?query=random&per_page=30&orientation=landscape',
      options
    )
    console.log('src', response.data.results[0].urls.raw)
    console.log('description', response.data.results[0].description)
    console.log('alt', response.data.results[0].alt_description)
    console.log('likes', response.data.results[0].likes)
    console.log('createdAt', response.data.results[0].created_at)
    console.log('fname', response.data.results[0].user.first_name)
    console.log('lname', response.data.results[0].user.last_name)
    console.log('avatar', response.data.results[0].user.profile_image.small)
  } catch (error) {
    console.error(error)
  }
}

router.get('/', getPhotos)

// export
module.exports = router
