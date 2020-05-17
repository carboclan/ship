import express from 'express';
import { connect } from 'mongoose';
import { urlencoded, json } from 'body-parser';
const app = express();
import passport, { initialize } from 'passport';
import users from './routes/api/user';
import projects from './routes/api/project'

// Bodyparser middleware
app.use(
  urlencoded({
    extended: false
  })
);
app.use(json());

// DB Config
import { mongoURI as db } from './config/keys';

// Connecting to MongoDB
connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB successfully connected'))
  .catch(err => console.log(err));

// Passport middleware
app.use(initialize());

// Passport config
require('./config/passport')(passport);

// Routes
app.use('/api/users', users);
app.use('/api/projects', projects);

const port = process.env.PORT || 3000; 

app.listen(port, () => console.log(`Server up and running on port ${port} !`));