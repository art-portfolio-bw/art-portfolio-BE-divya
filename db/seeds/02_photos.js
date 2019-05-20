const getPhotos = require('../../unsplash')

exports.seed = async function(knex, Promise) {
  const data = await getPhotos()  
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
