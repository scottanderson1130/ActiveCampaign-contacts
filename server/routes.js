const routes = require('express').Router();
const { getContacts, getTags, getDeals, getLocation } = require('./helpers.js');

/**
 * contacts/ route returning a contact object with parsed data from each contact of /contacts
 *
 * @returns {
 * {
 * firstName: String,
 * lastName: String,
 * id: String,
 * tagIds: Array,
 * tags: Array,
 * value: Integer,
 * deals: Integer,
 * city: String,
 * state: String
 * }}
 * *
 */
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
      res.send(contactLocal);
    })
    .catch(err => console.error(err));
});

module.exports = routes;
