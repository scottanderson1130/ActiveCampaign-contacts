const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./routes.js');
require('dotenv').config();

const PORT = process.env.PORT || 8080;

const app = express();

const DIST_DIR = path.join(__dirname, '../dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');
app.use(express.static(DIST_DIR));

app.use(cors());

app.use('/contacts', routes);

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
