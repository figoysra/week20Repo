const express = require('express');
const {
  getList, getdetails, insert, update, destroy,
} = require('../controllers/products');

const productsrouter = express.Router();

productsrouter
  .get('/products', getList)
  .get('/products/:id', getdetails)
  .post('/products', insert)
  .put('/products/:id', update)
  .delete('/products/:id', destroy);

module.exports = productsrouter;
