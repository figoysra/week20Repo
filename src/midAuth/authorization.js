// const connection = require("../config/db")
const { failed } = require('../helpers/response');
const usersmodel = require('../models/usersmodel');

const authorization = (req, res, next) => {
  const id = req.userId;
  usersmodel
    .getdetails(id)
    .then((result) => {
      if (result[0].admin === 1) {
        next();
      } else {
        failed(res.status(401), 401, 'You Do Not Have Permission To Access');
      }
    })
    .catch((err) => {
      failed(res.status(404), 404, err);
    });
};
module.exports = authorization;
