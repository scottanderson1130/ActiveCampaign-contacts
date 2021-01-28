const axios = require('axios');
require('dotenv').config();

TOKEN = process.env.ACTIVE_CAMPAIGN_API_TOKEN;
const baseURL = 'https://sahmed93846.api-us1.com/api/3';
// ****** EXAMPLE BELOW ***** //
/**
 * Number.prototype.format(n, x, s, c)
 *
 * @param integer n: length of decimal
 * @param integer x: length of whole part
 * @param mixed   s: sections delimiter
 * @param mixed   c: decimal delimiter
 */

const parseContacts = contactArray => {
  return contactArray.map(contact => {
    const { firstName, lastName, id } = contact;
    return { firstName, lastName, id };
  });
};

const parseTagId = contactTags => {
  return contactTags.map(tagId => {
    const { id } = tagId;
    return id;
  });
};

const parseDeals = contactDealsArray => {
  return contactDealsArray.map(contact => {
    const { value, currency } = contact;
    return { value, currency };
  });
};

const currencyConverter = (value, unit) => {
  let dollars;
  if (unit === 'aud') dollars = Math.floor(parseInt(value * 0.768301));
  if (unit === 'eur') dollars = Math.floor(parseInt(value * 1.21283));
  if (unit === 'usd') dollars = parseInt(value);
  return dollars;
};

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
