const _ = require('lodash');
const redis = require('redis');
const fs = require('fs');
const productsmodel = require('../models/productsmodel');
const { success, failed } = require('../helpers/response');
const redisAction = require('../helpers/redis');
// const { REDIS_URL, REDIS_PORT, REDIS_PASSWORD } = require('../helpers/env');

const client = redis.createClient({
  host: 'redis-10687.c293.eu-central-1-1.ec2.cloud.redislabs.com', // localhost
  port: 10687,
  password: '12345',
});
const product = {
  getList: (req, res) => {
    try {
      const { query } = req;
      const search = query.search === undefined ? '' : query.search;
      const field = query.field === undefined ? 'pro.id' : query.field;
      const typeSort = query.sort === undefined ? 'ASC' : query.sort;
      const limit = query.limit === undefined ? 10 : query.limit;
      const page = query.page === undefined ? 1 : query.page;
      const offset = page === 1 ? 0 : (page - 1) * limit;
      client.get('products', (err, result) => {
        if (err) {
          failed(res, 401, err);
        } else if (!result) {
          productsmodel
            .getList(search, field, typeSort, limit, offset)
            .then(async (data) => {
              const allData = await productsmodel.getAllData();
              const response = {
                data,
                totalPage: Math.ceil(allData.length / limit),
                search,
                limit,
                page,
              };
              redisAction.set('products', JSON.stringify(allData));
              success(res, response, 'get all data success');
            })
            .catch((error) => {
              failed(res, 500, error);
            });
        } else {
          const response = JSON.parse(result);
          // eslint-disable-next-line max-len
          const dataFilter = _.filter(response, (e) => e.productName.toLowerCase().includes(search.toLowerCase()));
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
      const { id } = req.params;
      productsmodel
        .getdetails(id)
        .then((result) => {
          success(res, result[0], 'get details data success');
        })
        .catch((err) => {
          failed(res.status(404), 404, err);
        });
    } catch (error) {
      failed(res, 401, error);
    }
  },
  insert: (req, res) => {
    try {
      const { body } = req;
      const data = req.file ? { ...body, photo: req.file.filename } : { ...body, photo: 'defaultImage.jpg' };
      // console.log(data)
      productsmodel
        .insert(data)
        .then((result) => {
          client.del('products');
          success(res.status(200), result, 'insert data success');
        })
        .catch((err) => {
          // console.log(err);
          failed(res.status(404), 404, err);
        });
    } catch (error) {
      // console.log(error)
      failed(res.status(401), 401, error);
      // res.json(error)
    }
  },
  update: (req, res) => {
    try {
      const { id } = req.params;
      const { body } = req;
      productsmodel
        .getdetails(id)
        .then((result) => {
          const photo = req.file ? req.file.filename : result[0].photo;
          productsmodel
            .update(id, body, photo)
            .then((data) => {
              client.del('products');
              const validasi = req.file ? 'yes' : 'no';
              if (result[0].photo === 'defaultImage.jpg' || validasi === 'no') {
                success(res, data, 'Success Update data');
              } else {
                fs.unlink(`./uploads/${result[0].photo}`, (err) => {
                  if (err) {
                    failed(res.status(401), 401, err);
                  } else {
                    success(res, data, 'Success Update data');
                  }
                });
              }
            })
            .catch((err) => {
              failed(res.status(404), 404, err);
              // console.log(err)
            });
        })
        .catch((err) => {
          failed(res.status(404), 404, err);
        });
    } catch (error) {
      failed(res.status(401), 401, error);
      // res.json(error)
    }
  },
  destroy: (req, res) => {
    try {
      const { id } = req.params;
      productsmodel
        .getdetails(id)
        .then((result) => {
          productsmodel
            .destroy(id)
            .then((data) => {
              client.del('products');
              if (result[0].photo === 'defaultImage.jpg') {
                success(res, data, 'delete data success');
              } else {
                fs.unlink(`./uploads/${result[0].photo}`, (err) => {
                  if (err) {
                    failed(res.status(401), 401, err);
                  } else {
                    success(res, data, 'delete data success');
                  }
                });
              }
            })
            .catch((error) => {
              failed(res.status(404), 404, error);
              // console.log(error)
            });
        })
        .catch((err) => {
          failed(res, 404, err);
        });
    } catch (error) {
      failed(res, 401, error);
    }
  },
  // sendEmail: (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     productsmodel
  //       .getdetails(id)
  //       .then((result) => {
  //         sendEmail(req.query.email, result)
  //           .then((response) => {
  //             res.json(response);
  //           })
  //           .catch((err) => {
  //             res.json(err);
  //           });
  //       })
  //       .catch((err) => {
  //         failed(res, 404, err);
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
};

module.exports = product;
