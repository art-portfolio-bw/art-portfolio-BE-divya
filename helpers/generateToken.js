const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

const generateToken = artist => {
  const payload = {
    subject: artist.artistId,
    fname: artist.fname,
    lname: artist.lname
  }
  const options = {
    expiresIn: '7d' // 7 days
  }
  return jwt.sign(payload, secret, options)
}

module.exports = generateToken
