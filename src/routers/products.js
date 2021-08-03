const express = require('express');
const {
  getList, getdetails, insert, update, destroy,
} = require('../controllers/products');
const midAuth = require('../midAuth/authentication');

const productsrouter = express.Router();

productsrouter
  .get('/products', midAuth, getList)
  .get('/products/:id', midAuth, getdetails)
  .post('/products', midAuth, insert)
  .put('/products/:id', midAuth, update)
  .delete('/products/:id', midAuth, destroy);

module.exports = productsrouter;
