const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const routes = require('./Routes/xuly');
const handlebars = require('express-handlebars');
const port = 3030;
const app = express();
var methods = require('method-override')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

mongoose.connect('mongodb://127.0.0.1:27017/lab6')
  .then(function(){
    console.log('Connected to MongoDB')
  }).catch(function(err){
    console.log('Error connecting to MongoDB'+ err)
  })
  
  app.use(express.json())
  app.use(methods("_method"))

  app.engine('.hbs',handlebars.engine({
    extname:"hbs"
  }) );

 
 

  app.set('view engine', '.hbs');
  app.set('views', './views');
 
  app.use("/data",routes)


  app.listen(port, function(){
    console.log('listening on port:' + port);
  });