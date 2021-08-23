const express = require('express');
const {
  getList, getdetails, insert, update, destroy,
} = require('../controllers/promo');
const midAuth = require('../midAuth/authentication');

const promorouter = express.Router();

promorouter
  .get('/promo', midAuth, getList)
  .get('/promo/:id', midAuth, getdetails)
  .post('/promo', midAuth, insert)
  .put('/promo/:id', midAuth, update)
  .delete('/promo/:id', midAuth, destroy);

module.exports = promorouter;
