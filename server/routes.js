const routes = require('express').Router();
const cors = require('cors');
const { getContacts, getTags, getDeals, getLocation } = require('./helpers.js');

routes.use(
  cors({
    origin: 'http://localhost:8080/',
    credentials: true
  })
);

routes.get('/', (req, res) => {
  getContacts()
    .then(async contacts => {
      const contactTags = await getTags(contacts);
      return contactTags;
    })
    .catch(err => console.error(err))
    .then(async contacts => {
      const contactDeals = await getDeals(contacts);
      return contactDeals;
    })
    .catch(err => console.error(err))
    .then(async contacts => {
      const contactLocal = await getLocation(contacts);
      console.log(contactLocal);
      res.send(contactLocal);
    })
    .catch(err => console.error(err));
});

module.exports = routes;
