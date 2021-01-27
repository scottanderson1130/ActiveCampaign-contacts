const axios = require('axios');
require('dotenv').config();

TOKEN = process.env.ACTIVE_CAMPAIGN_API_TOKEN;

const getContacts = () =>
  axios({
    method: 'get',
    url: 'https://sahmed93846.api-us1.com/api/3/contacts',
    headers: {
      'Api-Token': TOKEN
    }
  });

module.exports = getContacts;
