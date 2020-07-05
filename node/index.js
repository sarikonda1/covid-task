const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const path = require("path");
const multer = require("multer");
const fs = require('fs');
const User = require('./user');
const { diskStorage } = require('multer');
app.use(express.json());
express.static(path.join(__dirname, "./public"));
const storage = diskStorage({
  destination: function(req, file, cb){
    cb(null, './uploads');
  },
  filename: function(req, file, cb){
    cb(null, new Date().toISOString() + file.originalname);
  }
});
var cors = require('cors');
const upload = multer({storage: storage});
app.use(cors()) // Use this after the variable declaration

// const upload = multer({
//   dest: "uploads/"
//   // you might also want to set some limits: https://github.com/expressjs/multer#limits
// });
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
  });

// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect('mongodb://localhost:27017/covid-task', {useUnifiedTopology: true,  useNewUrlParser: true });

app.post('/api/createUser', upload.single('file'), function(req, res) {
  console.log(req.body);
  var file = __dirname ;
  console.log(file);
  var chatRm = new User(req.body);
  chatRm.save((err, users) => {
  console.log(err);
  if (err){
    res.status(500).send(null);
  } else{
    console.log(users);
    res.send(users);
  }
  });
});

app.put('/api/updateUser', (request, ress) => {
    console.log(request.body);
    User.updateOne({_id: request.body._id},
        {$upsert: request.body},
        { multi: false, upsert: true },
        function(err, res) {
          console.log(res)
            if(err){
            console.log(err);
            ress.status(500).send(err);
            }else{
            //do stuff
            ress.send(null);
            }
        }
    );
});

app.get('/api/users', (request, ress) => { 
    const roomss = User.find({}, (err, res) => {
        console.log(err);
        ress.status(200).send(res);
      });
});
app.get('/api/users/:id', (request, ress) => { 
  console.log(request.params.id);
  const roomss = User.findById(request.params.id, (err, res) => {
      console.log(err);
      ress.status(200).send(res);
    });
});

app.delete('/api/delete/:id', (request, ress) => { 
    User.deleteOne({_id: request.params.id}, function(err, res){
      if(err){
        ress.send(null).status(500);
      }
      ress.send(res);
    });
});
app.listen(8000, function() {
    console.log('listening on 3000');
})