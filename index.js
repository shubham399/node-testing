
const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = process.env.PORT || 9999

let dataStore =[];

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('URL Shortner UP')
})

app.post('/',(req,res) =>{
  let id = makeid(5);
  let obj = {url:req.body.url,id}
  dataStore.push(obj)
  res.json(obj)
})

app.get('/:id',(req,res) =>{
  let obj = dataStore.find(x=>x.id ==req.params.id);
  if(obj){
    res.redirect(obj.url)
  }
  else{
    res.status(404);
    res.send("Not found");
  }
})

const server = app.listen(port)

module.exports = { app, server };
