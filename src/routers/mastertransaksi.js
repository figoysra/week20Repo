const express = require('express');
// eslint-disable-next-line import/extensions
const { getList, getdetails, insert } = require('../controllers/mastertransaksi.js');

const authentication = require('../midAuth/authentication');
const authorization = require('../midAuth/authorization');

const mastertransaksi = express.Router();

mastertransaksi
  .get('/inv', authentication, authorization, getList)
  .get('/myinv', authentication, getdetails)
  .post('/inv', authentication, insert);

module.exports = mastertransaksi;
