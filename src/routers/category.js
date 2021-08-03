const express = require('express');
const {
  getList, getdetails, insert, update, destroy,
} = require('../controllers/category');

const midAuth = require('../midAuth/authentication');

const categoryrouter = express.Router();

categoryrouter
  .get('/cat', midAuth, getList)
  .get('/cat/:id', midAuth, getdetails)
  .post('/cat', midAuth, insert)
  .put('/cat/:id', midAuth, update)
  .delete('/cat/:id', midAuth, destroy);

module.exports = categoryrouter;
