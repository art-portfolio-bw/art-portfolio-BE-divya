require('dotenv').config()
const axios = require('axios')

const key = process.env.UNSPLASH_KEY

const getPhotos = async (page = 1, per_page = 10) => {
  try {
    const options = {
      headers: {
        Authorization: `Client-ID ${key}`
      }
    }
    const response = await axios.get(
      `https://api.unsplash.com/search/photos?query=random&page=${page}&per_page=${per_page}&orientation=landscape`,
      options
    )
    return response.data.results.map(result => ({
      src: result.urls.raw,
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
