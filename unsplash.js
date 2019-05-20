require('dotenv').config()
const axios = require('axios')

const key = process.env.UNSPLASH_KEY

const getPhotos = async url => {
  try {
    const options = {
      headers: {
        Authorization: `Client-ID ${key}`
      }
    }
    const response = await axios.get(url, options)
    return response.data.results.map(result => ({
      src: result.urls.small,
      description: result.description || '',
      alt: result.alt_description || '',
      likes: result.likes || 0,
      createdAt: result.created_at,
      fname: result.user.first_name,
      lname: result.user.last_name || '',
      avatar: result.user.profile_image.small,
      email: `${result.user.username}@email.com`,
      artistId: result.user.id
    }))
  } catch (error) {
    console.error(error)
  }
}

module.exports = getPhotos
