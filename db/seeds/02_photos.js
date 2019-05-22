const getPhotos = require('../../helpers/unsplash')

exports.seed = async function(knex, Promise) {
  const url =
    'https://api.unsplash.com/search/photos?query=random&page=1&per_page=30&orientation=landscape'
  const data = await getPhotos(url)
  const photos = data.map(photo => ({
    src: photo.src,
    description: photo.description,
    alt: photo.alt,
    likes: photo.likes,
    createdAt: photo.createdAt,
    artistId: photo.artistId
  }))
  return await knex('photos').insert(photos)
}
