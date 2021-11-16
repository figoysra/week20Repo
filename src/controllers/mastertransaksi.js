const _ = require('lodash');
const redis = require('redis');
const mastertransaksimodel = require('../models/mastertransaksimodel');
const { success, failed } = require('../helpers/response');
const redisAction = require('../helpers/redis');
// const { REDIS_URL, REDIS_PASSWORD, REDIS_PORT } = require('../helpers/env');

const client = redis.createClient({
  host: 'redis-10687.c293.eu-central-1-1.ec2.cloud.redislabs.com', // localhost
  port: 10687,
  password: '12345',
});
const mastertransaksi = {
  getList: (req, res) => {
    try {
      const { query } = req;
      const search = query.search === undefined ? '' : query.search;
      const field = query.field === undefined ? 'inv.alamat' : query.field;
      const typeSort = query.sort === undefined ? 'ASC' : query.sort;
      const limit = query.limit === undefined ? 10 : query.limit;
      const page = query.page === undefined ? 1 : query.page;
      const offset = page === 1 ? 0 : (page - 1) * limit;
      client.get('invoice', (err, result) => {
        if (err) {
          failed(res, 401, err);
        } else if (!result) {
          mastertransaksimodel
            .getList(search, field, typeSort, limit, offset)
            .then(async (data) => {
              const allData = await mastertransaksimodel.getAllData();
              const response = {
                data,
                totalPage: Math.ceil(allData.length / limit),
                search,
                limit,
                page,
              };
              redisAction.set('invoice', JSON.stringify(allData));
              success(res, response, 'get all data success');
            })
            .catch((error) => {
              failed(res, 500, error);
            });
        } else {
          const response = JSON.parse(result);
          const dataFilter = _.filter(response, (e) => e.alamat.includes(search));
          const paginated = _.slice(dataFilter, offset, offset + limit);
          const output = {
            data: paginated,
            totalPage: Math.ceil(response.length / limit),
          };
          success(res, output, 'success');
        }
      });
    } catch (error) {
      failed(res, 401, error);
    }
  },
  getdetails: (req, res) => {
    try {
      const id = req.userId;
      // console.log(id)
      mastertransaksimodel
        .getdetails(id)
        .then((result) => {
          success(res, result, 'get invoice success');
        })
        .catch((err) => {
          failed(res.status(404), 404, err);
        });
    } catch (error) {
      failed(res.status(404), 401, error);
    }
  },
  insert: (req, res) => {
    try {
      const { body } = req;
      const id = req.userId;
      mastertransaksimodel
        .insert(body, id)
        .then((result) => {
          client.del('invoice');
          success(res, result, 'insert transaction success');
        })
        .catch((err) => {
          // console.log(err);
          failed(res.status(404), 404, err);
        });
    } catch (error) {
      failed(res.status(401), 401, error);
      // res.json(error)
    }
  },
};

module.exports = mastertransaksi;
