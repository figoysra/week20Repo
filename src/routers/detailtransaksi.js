const express = require('express');
const { getdetails } = require('../controllers/detailtransaksi');

const authentication = require('../midAuth/authentication');

const detailtransaksi = express.Router();

detailtransaksi
  .get('/myproducts/:id', authentication, getdetails);

module.exports = detailtransaksi;
