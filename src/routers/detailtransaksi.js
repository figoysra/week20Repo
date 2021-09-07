const express = require("express");
const {
    getList, getdetails
} = require("../controllers/detailtransaksi");

const authentication = require("../midAuth/authentication");

const detailtransaksi = express.Router();

detailtransaksi
  .get("/detailtransaksi", authentication, getList)
  .get("/detailtransaksi/:id", authentication, getdetails);

module.exports = detailtransaksi;
