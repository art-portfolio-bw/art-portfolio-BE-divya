// imports
require('dotenv').config()
const app = require('./server')

// variables
const port = process.env.PORT || 9090

app.listen(port, () => console.log('🌿  🥀  🦋'))
