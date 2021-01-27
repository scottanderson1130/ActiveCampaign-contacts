const routes = require('express').Router();
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

routes.use(bodyParser.json());
routes.use(bodyParser.urlencoded({ extended: true }));
routes.use(
  cors({
    origin: 'http://localhost:8080',
    credentials: true
  })
);

module.exports = routes;
