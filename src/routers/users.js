const express = require('express');
const {
  getList, getdetails, insert, login, update, destroy,
} = require('../controllers/users');
// const upload = multer({ dest: "uploads/" });

const authentication = require("../midAuth/authentication");
const authorization = require("../midAuth/authorization");
const upload = require("../midAuth/upload")


const usersrouter = express.Router();

usersrouter
  .get('/users', [authentication, authorization], getList)
  .get('/users/:id',authentication, getdetails)
  .post('/users', upload, insert)
  .post('/login', login)
  .put('/users/:id', authentication, update)
  .delete('/users/:id', authentication, destroy);

module.exports = usersrouter;
