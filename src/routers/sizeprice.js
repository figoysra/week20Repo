const express = require('express');
const {
  getList, getdetails, insert, update, destroy,
} = require('../controllers/sizeprice');
const midAuth = require('../midAuth/authentication');

const sizeprice = express.Router();

sizeprice
  .get('/sizeprice', midAuth, getList)
  .get('/sizeprice/:id', midAuth, getdetails)
  .post('/sizeprice', midAuth, insert)
  .put('/sizeprice/:id', midAuth, update)
  .delete('/sizeprice/:id', midAuth, destroy);

module.exports = sizeprice;
