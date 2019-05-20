const getPhotos = require('../../unsplash')
const uniqBy = require('lodash/uniqBy')

exports.seed = async function(knex, Promise) {
  const data = await getPhotos(1, 30)
  const uniqArtists = uniqBy(data, 'artistId')
  const artists = uniqArtists.map(artist => ({
    fname: artist.fname,
    lname: artist.lname,
    avatar: artist.avatar,
    email: artist.email,
    password: 'password',
    artistId: artist.artistId
  }))
  return await knex('artists').insert(artists)
}
