const express = require('express');
const {
  getList, sendEmail, getdetails, insert, update, destroy,
} = require('../controllers/products');


const productsrouter = express.Router();
const authentication = require("../midAuth/authentication");
const authorization = require("../midAuth/authorization");
const upload = require("../midAuth/upload");

productsrouter
  .get("/products", getList)
  .get("/sendproductEmail/:id", authentication, sendEmail)
  .get("/products/:id", authentication, getdetails)
  .post("/products", authentication, authorization, upload, insert)
  .put("/products/:id", authentication, authorization, upload, update)
  .delete("/products/:id", authentication, authorization, destroy);

module.exports = productsrouter;
