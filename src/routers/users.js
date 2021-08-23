const express = require('express');
const {
  getList, getdetails, insert, login, update, destroy,
} = require('../controllers/users');

const midAuth = require('../midAuth/authentication');

const usersrouter = express.Router();

usersrouter
  .get('/users', midAuth, getList)
  .get('/users/:id', midAuth, getdetails)
  .post('/users', insert)
  .post('/login', login)
  .put('/users/:id', midAuth, update)
  .delete('/users/:id', midAuth, destroy);

module.exports = usersrouter;
