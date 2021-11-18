const express = require('express');
const {
  getList, getdetails, insert, login, update, destroy,
} = require('../controllers/users');
// const upload = multer({ dest: "uploads/" });

const authentication = require('../midAuth/authentication');
const authorization = require('../midAuth/authorization');
const upload = require('../midAuth/upload');

const usersrouter = express.Router();

usersrouter
  .get('/users', getList)
  .get('/users/:id', authentication, getdetails)
  .post('/register', insert)
  .post('/login', login)
  .put('/users/:id', upload, update)
  .delete('/users/:id', destroy);

module.exports = usersrouter;
