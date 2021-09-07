const bcrypt = require('bcrypt');
const usersmodel = require('../models/usersmodel');
const redisAction = require("../helpers/redis");
const _ = require("lodash");
const redis = require("redis");
const client = redis.createClient({
  host: "127.0.0.1", // localhost
  port: 6379,
});
const { success, failed, successLogin } = require('../helpers/response');


const users = {
  getList: (req, res) => {
    try {
      const { query } = req;
      const search = query.search === undefined ? "" : query.search;
      const field = query.field === undefined ? "id" : query.field;
      const typeSort = query.sort === undefined ? "ASC" : query.sort;
      const limit = query.limit === undefined ? 10 : query.limit;
      const page = query.page === undefined ? 1 : query.page;
      const offset = page === 1 ? 0 : (page - 1) * limit;
      client.get("users", (err, result) => {
        if (err) {
          failed(res, 401, err);
        } else if (!result) {
            usersmodel
              .getList(search, field, typeSort, limit, offset)
              .then(async (result) => {
                const alldata = await usersmodel.getAllData();
                const response = {
                  data: result,
                  totalPage: Math.ceil(alldata.length / limit),
                  page: req.query.page,
                };
                redisAction.set("users", JSON.stringify(alldata));
                success(res, response, "get all users success");
              })
              .catch((err) => {
                failed(res, 500, err);
              });
        } else {
          const response = JSON.parse(result);
          const dataFilter = _.filter(response, (e) =>
            e.email.includes(search)
          );
          const paginated = _.slice(dataFilter, offset, offset + limit);
          const output = {
            data: paginated,
            totalPage: Math.ceil(response.length / limit),
          };
          success(res, output, "success");
        }
      });
      
      //   success(res, response, 'get all users success');
      // }).catch((err) => {
      //   failed(res, 404, err);
      //   // console.log(err);
      // });
    } catch (error) {
      failed(res, 401, error);
      // res.json(error)
    }
  },
  getdetails: (req, res) => {
    try {
      const { id } = req.params;
      usersmodel.getdetails(id).then((result) => {
        client.del("users");
        success(res, result, 'get details data success');
      }).catch((err) => {
        failed(res, 404, err);
        // console.log(err)
      });
    } catch (error) {
      failed(res, 401, error);
      // res.json(error)
    }
  },
  insert: (req, res) => {
    try {
      const { body, file } = req;
      bcrypt.hash(body.password, 10, (err, hash) => {
        if (err) {
          failed(res, 401, err);
        } else {
          const data = {
            email: body.email,
            password: hash,
            photo:  file.filename,
            displayname: body.displayname,
            firstname: body.firstname,
            lastname: body.lastname,
            date: body.date,
            gender: body.gender,
            address: body.address,
            phone: body.phone,
          };
          usersmodel.insert(data).then((result) => {
            client.del("users");
            success(res, result, 'insert data success');
          }).catch((error) => {
            failed(res, 404, error);
          });
        }
      });
    } catch (error) {
      failed(res, 401, error);
      // res.json(error)
    }
  },
  update: (req, res) => {
    try {
      const { id } = req.params;
      const { body } = req;
      bcrypt.hash(body.password, 10, (err, hash) => {
        if (err) {
          failed(res, 401, err);
        } else {
          const data = {
            email: body.email,
            password: hash,
            photo: body.photo,
            displayname: body.displayname,
            firstname: body.firstname,
            lastname: body.lastname,
            date: body.date,
            gender: body.gender,
            address: body.address,
            phone: body.phone,
          };
          usersmodel.update(id, data).then((result) => {
            client.del("users");
            // console.log(result)
            success(res, result, 'insert data success');
          }).catch((error) => {
            // console.log(error)
            failed(res, 404, error);
          });
        }
      });
    } catch (error) {
      failed(res, 401, error);
      // res.json(error)
    }
  },
  destroy: (req, res) => {
    try {
      const { id } = req.params;
      usersmodel.destroy(id).then((result) => {
        client.del("users");
        success(res, result, 'delete data success');
      }).catch((error) => {
        failed(res, 404, error);
      });
    } catch (error) {
      failed(res, 401, error);
    }
  },
  login: (req, res) => {
    try {
      const { body } = req;
      usersmodel.login(body).then((data) => {
        if (data.result.length <= 0) {
          res.json('email salah');
        } else {
          const hash = data.result[0].password;
          bcrypt.compare(body.password, hash, (error, checkpass) => {
            if (error) {
              res.json(error);
            } else if (checkpass === true) {
              successLogin(res, data.result, data.token);
            } else {
              failed(res, 404, 'Wrong Password');
            }
          });
        }
      }).catch((error) => {
        failed(res, 404, error);
        // console.log(error)
      });
    } catch (error) {
      failed(res, 401, error);
    }
  },

};

module.exports = users;
