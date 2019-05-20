require('dotenv').config()
const axios = require('axios')

const key = process.env.UNSPLASH_KEY

const getPhotos = async () => {
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
    return response.data.results.map(result => ({
      src: result.urls.raw,
      description: result.description || '',
      alt: result.alt_description || '',
      likes: result.likes,
      createdAt: result.created_at,
      fname: result.user.first_name,
      lname: result.user.last_name || '',
      avatar: result.user.profile_image.small
    }))
  } catch (error) {
    console.error(error)
  }
}

module.exports = getPhotos
