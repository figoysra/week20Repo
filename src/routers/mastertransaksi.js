const express = require("express");
const { getList, insert } = require("../controllers/mastertransaksi.js");

const authentication = require("../midAuth/authentication");

const mastertransaksi = express.Router();

mastertransaksi
  .get("/inv", authentication, getList)
  .post("/inv", authentication, insert);

module.exports = mastertransaksi;
