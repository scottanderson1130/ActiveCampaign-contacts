const routes = require('express').Router();
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const getContacts = require('./helpers.js');

// routes.use(bodyParser.json());
// routes.use(bodyParser.urlencoded({ extended: true }));
routes.use(
  cors({
    origin: 'http://localhost:8080/',
    credentials: true
  })
);

routes.get('/', (req, res) => {
  console.log('here');
  getContacts()
    .then(data => {
      res.json(data.data);
    })
    .catch(err => res.status(400).send(err));
});

module.exports = routes;
