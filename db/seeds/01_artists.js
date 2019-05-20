const getPhotos = require('../../unsplash')

exports.seed = async function(knex, Promise) {
  const data = await getPhotos()
  const artists = data.map(photo => ({
    fname: photo.fname,
    lname: photo.lname,
    avatar: photo.avatar,
    email: '',
    password: 'password'
  }))
  return await knex('artists').insert(artists)
}
