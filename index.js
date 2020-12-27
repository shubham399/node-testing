
const express = require('express')
const app = express()
const port = process.env.PORT || 9999

app.get('/', (req, res) => {
  res.send('URL Shortner UP')
})

app.post('/',(req,res) =>{
  res.json({"url":"hello","shortURL":"hello"})
})

app.get('/:id',(req,res) =>{
  res.redirect("http://google.com")
})

const server = app.listen(port)

module.exports = { app, server };
