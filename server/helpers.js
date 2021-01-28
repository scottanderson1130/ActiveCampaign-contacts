const axios = require('axios');
require('dotenv').config();

TOKEN = process.env.ACTIVE_CAMPAIGN_API_TOKEN;
const baseURL = 'https://sahmed93846.api-us1.com/api/3';

/**
 * Map through the full contacts object and return only the firstName, lastName and id
 * @param {Array} contactArray Object returned from the api call /contacts
 * @returns {Object}
 * *
 */
const parseContacts = contactArray => {
  return contactArray.map(contact => {
    const { firstName, lastName, id } = contact;
    return { firstName, lastName, id };
  });
};

/**
 * Map through the contactTags object to return a list of all tag id's
 * @param {Array} contactTags Object returned from the api call /contacts/:id/contactTags
 * * @returns {Array}
 * *
 */
const parseTagId = contactTags => {
  return contactTags.map(tagId => {
    const { id } = tagId;
    return id;
  });
};

/**
 * Map through the deals Object to return an object of the value and currency
 * @param {Array} contactDealsArray Object returned from the api call /contacts/:id/deals
 * @returns {Object}
 * *
 */
const parseDeals = contactDealsArray => {
  return contactDealsArray.map(contact => {
    const { value, currency } = contact;
    return { value, currency };
  });
};

/**
 * Converts incoming currency to USD. (Only includes AUD and EUR conversion)
 * Calculation to convert to monetary value will by done on the Front End
 * @param {String/Integer} value Integer to be converted to USD
 * @param {String} unit Unit to base conversion to USD
 * @returns {Integer} USD conversion
 * *
 */
const currencyConverter = (value, unit) => {
  let dollars;
  if (unit === 'aud') dollars = Math.floor(parseInt(value * 0.768301));
  if (unit === 'eur') dollars = Math.floor(parseInt(value * 1.21283));
  if (unit === 'usd') dollars = parseInt(value);
  return dollars;
};

/**
 * API call to grab all the tag info from a given contact id
 * @param {Array} tagIdsArray Tag id's that are returned from parseTagId
 * @returns {Array} Returns an Array of multiple tags.
 * *
 */
const parseTags = async tagIdsArray => {
  const asyncResp = Promise.all(
    tagIdsArray.map(async id => {
      const response = await axios({
        method: 'get',
        url: `${baseURL}/contactTags/${id}/tag`,
        headers: {
          'Api-Token': TOKEN
        }
      })
        .then(tags => {
          const { data } = tags;
          const { tag } = data;
          return tag.tag;
        })
        .catch(err => console.error(err));

      return response;
    })
  );
  return await asyncResp;
};

/**
 * API call to grab all the contacts and return the relevant contact info
 * @returns {Object} firstName, lastName, id
 * *
 */
const getContacts = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: `${baseURL}/contacts`,
      headers: {
        'Api-Token': TOKEN
      }
    }).then(contacts => {
      const { data } = contacts;
      const contact = parseContacts(data.contacts);
      return contact;
    });
    return response;
  } catch (err) {
    console.error('Error', err);
  }
};

/**
 * API call to grab all the tags and return an in an array
 * Adds the tags and tagIds array to the contact object
 * @returns {Array} tags
 * *
 */
const getTags = async contactArray => {
  const asyncResults = Promise.all(
    contactArray.map(async contact => {
      const { id } = contact;

      const response = await axios({
        method: 'get',
        url: `${baseURL}/contacts/${id}/contactTags`,
        headers: {
          'Api-Token': TOKEN
        }
      })
        .then(data => {
          const tagId = parseTagId(data.data.contactTags);
          contact['tagIds'] = tagId;
          return contact;
        })
        .catch(err => console.error(err))
        .then(async contacts => {
          const { tagIds } = contacts;
          const tags = await parseTags(tagIds);
          contact['tags'] = tags;
          return contact;
        })
        .catch(err => console.error(err));

      return response;
    })
  );
  return await asyncResults;
};

/**
 * API call to grab all the deals and return the number of deals and the total value if more than 1
 * If no deals are found, value will be returned as 0.
 * All values will be returned in USD
 * Adds the tags and tagIds array to the contact object
 * @returns {Integer} value
 * @returns {Integer} deals
 * *
 */
const getDeals = async contactArray => {
  const asyncResponse = Promise.all(
    contactArray.map(async contact => {
      const { id } = contact;

      const response = await axios({
        method: 'get',
        url: `${baseURL}/contacts/${id}/deals`,
        headers: {
          'Api-Token': TOKEN
        }
      })
        .then(async contactDeals => {
          const { data } = contactDeals;
          const { deals } = data;

          if (deals.length > 0) {
            const values = await parseDeals(deals);
            if (values.length > 1) {
              let value = values.reduce((totalVal, val) => {
                val = currencyConverter(val.value, val.currency);
                return totalVal + parseInt(val);
              }, 0);
              contact['value'] = value;
              contact['deals'] = deals.length;
            } else {
              contact['value'] = parseInt(values[0].value);
              contact['deals'] = deals.length;
            }
          } else {
            contact['value'] = 0;
            contact['deals'] = deals.length;
          }
          return contact;
        })
        .catch(err => console.error(err));

      return await response;
    })
  );
  return await asyncResponse;
};

/**
 * API call to grab get the location of the contact
 * Only 1 contact info given in the API and returned for each contact
 * @returns {String} city
 * @returns {String} state
 * *
 */
const getLocation = async contactArray => {
  const response = await axios({
    method: 'get',
    url: `${baseURL}/addresses/1`,
    headers: {
      'Api-Token': TOKEN
    }
  })
    .then(async address => {
      const addAddress = Promise.all(
        contactArray.map(async contact => {
          const { city, state } = address.data.address;
          contact['city'] = city;
          contact['state'] = state;
          return contact;
        })
      );
      return await addAddress;
    })
    .catch(err => console.error(err));

  return await response;
};

module.exports = { getContacts, getTags, getDeals, getLocation };
