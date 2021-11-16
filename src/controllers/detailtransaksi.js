// const _ = require('lodash');
// const redis = require('redis');
const { success, failed } = require('../helpers/response');
const detailtransaksimodel = require('../models/detailtransaksimodel');
// const redisAction = require('../helpers/redis');
// const client = redis.createClient({
//   host: "127.0.0.1", // localhost
//   port: 6379,
// });
const detailtransaksi = {
  getdetails: (req, res) => {
    try {
      const { id } = req.params;
      detailtransaksimodel
        .getdetails(id)
        .then((result) => {
          success(res, result, 'get details data success');
        })
        .catch((err) => {
          failed(res.status(404), 404, err);
        });
    } catch (error) {
      failed(res, 401, error);
    }
  },
};

module.exports = detailtransaksi;
