const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const passport = require('passport');

const users = require('./routes/api/user');
const projects = require('./routes/api/project')

const local = true;

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB Config
var db;
/*if (local) {
  console.log("local mongoDB")
  db = require('../server/config/keys').mongoURILocal;
} else {
  db = require('../server/config/keys').mongoURI;
}*/
db = require('../server/config/keys').mongoURI;

// Connecting to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB successfully connected'))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

// Routes
app.use('/api/users', users);
app.use('/api/projects', projects);

const port = process.env.PORT || 3000; 

app.listen(port, () => console.log(`Server up and running on port ${port} !`));