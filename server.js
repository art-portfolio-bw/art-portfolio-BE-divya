// imports
const express = require('express')
const helmet = require('helmet') // secures HTTP headers
const cors = require('cors') // accepts requests from outside the domain where the resource is served

// variables
const app = express()

// server configurations
app.use(helmet())
app.use(cors())
app.use(express.json()) // parses incoming data

// routes
app.get('/', (rep, res) => res.json({msg: '🌿  🥀 🦋'}))

// export
module.exports = app
