
const express = require('express')
const app = express()
const port = process.env.PORT || 9999

app.get('/', (req, res) => {
  res.send('URL Shortner UP')
})

const server = app.listen(port)

module.exports = { app, server };
