const getPhotos = require('../../unsplash')
const uniqBy = require('lodash/uniqBy')

exports.seed = async function(knex, Promise) {
  const url =
    'https://api.unsplash.com/search/photos?query=random&page=1&per_page=30&orientation=landscape'
  const data = await getPhotos(url)
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
