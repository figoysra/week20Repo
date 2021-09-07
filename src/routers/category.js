const express = require('express');
const {
  getList, getdetails, insert, update, destroy,
} = require('../controllers/category');

const authentication = require("../midAuth/authentication");
const authorization = require("../midAuth/authorization");

const categoryrouter = express.Router();

categoryrouter
  .get('/cat', authentication, getList)
  .get('/cat/:id', authentication, getdetails)
  .post('/cat', authentication,authorization, insert)
  .put('/cat/:id', authentication,authorization, update)
  .delete('/cat/:id', authentication,authorization, destroy);

module.exports = categoryrouter;
