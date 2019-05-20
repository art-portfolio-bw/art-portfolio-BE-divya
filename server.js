// imports
const express = require('express')
const helmet = require('helmet') // secures HTTP headers
const cors = require('cors') // accepts requests from outside the domain where the resource is served

// route imports
const signupRoute = require('./routes/signup')
const photoRoutes = require('./routes/photos')

// variables
const app = express()

// server configurations
app.use(helmet())
app.use(cors())
app.use(express.json()) // parses incoming data

// routes
app.use('/', photoRoutes)
app.use('/signup', signupRoute)

// export
module.exports = app
