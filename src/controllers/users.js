const bcrypt = require('bcrypt');
const _ = require('lodash');
const redis = require('redis');
const fs = require('fs');
const usersmodel = require('../models/usersmodel');
const { success, failed, successLogin } = require('../helpers/response');
const redisAction = require('../helpers/redis');
// const { REDIS_URL, REDIS_PASSWORD, REDIS_PORT } = require('../helpers/env');

const client = redis.createClient({
  host: 'redis-10687.c293.eu-central-1-1.ec2.cloud.redislabs.com', // localhost
  port: 10687,
  password: '12345',
});

const users = {
  getList: (req, res) => {
    try {
      const { query } = req;
      const search = query.search === undefined ? '' : query.search;
      const field = query.field === undefined ? 'id' : query.field;
      const typeSort = query.sort === undefined ? 'ASC' : query.sort;
      const limit = query.limit === undefined ? 10 : query.limit;
      const page = query.page === undefined ? 1 : query.page;
      const offset = page === 1 ? 0 : (page - 1) * limit;
      client.get('users', (err, result) => {
        if (err) {
          failed(res, 401, err);
        } else if (!result) {
          usersmodel
            .getList(search, field, typeSort, limit, offset)
            .then(async (value) => {
              const alldata = await usersmodel.getAllData();
              const response = {
                data: value,
                totalPage: Math.ceil(alldata.length / limit),
                page: req.query.page,
              };
              redisAction.set('users', JSON.stringify(alldata));
              success(res.status(200), response, 'get all users success');
            })
            // eslint-disable-next-line no-shadow
            .catch((err) => {
              failed(res.status(500), 500, err);
            });
        } else {
          const response = JSON.parse(result);
          const dataFilter = _.filter(response, (e) => e.email.includes(search));
          const paginated = _.slice(dataFilter, offset, offset + limit);
          const output = {
            data: paginated,
            totalPage: Math.ceil(response.length / limit),
          };
          success(res, output, 'success');
        }
      });
    } catch (error) {
      failed(res.status(401), 401, error);
      // res.json(error)
    }
  },
  getdetails: (req, res) => {
    try {
      const { id } = req.params;
      usersmodel
        .getdetails(id)
        .then((result) => {
          client.del('users');
          success(res.status(200), result, 'get details data success');
        })
        .catch((err) => {
          failed(res.status(404), 404, err);
        });
    } catch (error) {
      failed(res.status(401), 401, 'err');
    }
  },
  insert: (req, res) => {
    try {
      const { body } = req;
      usersmodel
        .login(body)
        .then((data) => {
          if (data.length <= 0) {
            bcrypt.hash(body.password, 10, (err, hash) => {
              if (err) {
                failed(res.status(401), 401, err);
              } else {
                // console.log(photo)
                const value = {
                  email: body.email,
                  password: hash,
                  photo: 'defaultImage.jpg',
                  displayname: body.email,
                  phone: body.phone,
                  admin: body.admin,
                };
                // console.log(data)
                usersmodel
                  .insert(value)
                  .then((result) => {
                    client.del('users');
                    success(res.status(200), result, 'insert data success');
                  })
                  .catch((error) => {
                    // console.log(error);
                    failed(res.status(404), 404, error);
                  });
              }
            });
          } else {
            // console.log('err')
            failed(res.status(401), 401, 'You already Register');
          }
        })
        .catch((error) => {
          failed(res.status(404), 404, error);
          // console.log(error)
        });
    } catch (error) {
      failed(res.status(401), 401, error);
      // res.json(error)
    }
  },
  update: (req, res) => {
    try {
      const { id } = req.params;
      const { body } = req;
      usersmodel.getdetails(id).then((result) => {
        client.del('users');
        const data = {
          email: body.email,
          photo: req.file ? req.file.filename : result[0].photo,
          displayname: body.displayname,
          firstname: body.firstname,
          lastname: body.lastname,
          date: body.date,
          gender: body.gender,
          address: body.address,
          phone: body.phone,
          admin: result[0].admin,
        };
        const validasi = req.file ? 'yes' : 'no';
        // console.log(validasi)
        usersmodel
          .update(id, data)
          .then((value) => {
            if (result[0].photo === 'defaultImage.jpg' || validasi === 'no') {
              client.del('users');
              // console.log(result)
              success(res, value, 'update data success');
            } else {
              fs.unlink(`./uploads/${result[0].photo}`, (error) => {
                if (error) {
                  failed(res.status(401), 401, error);
                } else {
                  client.del('users');
                  // console.log(result)
                  success(res, value, 'update data success');
                }
              });
            }
          })
          .catch((error) => {
            // console.log( "ini" + error);
            failed(res.status(404), 404, error);
          });
      })
        .catch((err) => {
          // console.log(err)
          failed(res.status(404), 404, err);
        });
    } catch (error) {
      failed(res, 401, error);
    }
  },
  destroy: (req, res) => {
    try {
      const { id } = req.params;
      usersmodel.getdetails(id).then((result) => {
        if (result.length <= 0) {
          failed(res.status(404), 404, 'Your Request is not Found');
        // eslint-disable-next-line keyword-spacing
        }else {
          usersmodel
            .destroy(id)
            .then((data) => {
              if (result[0].photo === 'defaultImage.jpg') {
                client.del('users');
                success(res.status(200), data, 'delete data success');
              } else {
                fs.unlink(`./uploads/${result[0].photo}`, (err) => {
                  if (err) {
                    failed(res.status(401), 401, err);
                  } else {
                    client.del('users');
                    success(res.status(200), data, 'delete data success');
                  }
                });
              }
            })
            .catch((error) => {
              failed(res.status(404), 404, error);
            });
        }
      });
    } catch (error) {
      failed(res, 401, error);
    }
  },
  login: (req, res) => {
    try {
      const { body } = req;
      usersmodel
        .login(body)
        .then((data) => {
          const hash = data.result[0].password;
          bcrypt.compare(body.password, hash, (error, checkpass) => {
            if (error) {
              failed(res.status(401), 401, error);
            } else if (checkpass === true) {
              successLogin(res, data.result[0], data.token);
            } else {
              failed(res.status(404), 404, 'Wrong Password');
            }
          });
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          failed(res.status(404), 404, 'Wrong Emails');
          // console.log(error)
        });
    } catch (error) {
      failed(res.status(401), 401, error);
    }
  },
};

module.exports = users;

// [...array[1].data, ...array[2].data, 1,1,1,1]
