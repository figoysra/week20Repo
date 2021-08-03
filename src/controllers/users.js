const bcrypt = require('bcrypt');
const usersmodel = require('../models/usersmodel');
const { success, failed } = require('../helpers/response');
const tokencode = require('../config/token');

const users = {
  getList: (req, res) => {
    try {
      const { query } = req;
      const search = query.search === undefined ? '' : query.search;
      const field = query.field === undefined ? 'id' : query.field;
      const typeSort = query.sort === undefined ? 'ASC' : query.sort;
      const limit = query.limit === undefined ? 10 : query.limit;
      const offset = query.page === undefined || query.page === 1 ? 0 : (query.page - 1) * limit;
      usersmodel.getList(search, field, typeSort, limit, offset).then(async (result) => {
        const alldata = await usersmodel.getAllData();
        const response = {
          data: result,
          totalPage: Math.ceil(alldata.length / limit),
          page: req.query.page,
        };
        success(res, response, 'get all users success');
      }).catch((err) => {
        failed(res, 404, err);
        // console.log(err);
      });
    } catch (error) {
      failed(res, 401, error);
      // res.json(error)
    }
  },
  getdetails: (req, res) => {
    try {
      const { id } = req.params;
      usersmodel.getdetails(id).then((result) => {
        success(res, result, 'get details data success');
        // res.json(result)
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
          usersmodel.insert(data).then((result) => {
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
      usersmodel.login(body).then((result) => {
        if (result.length <= 0) {
          res.json('email salah');
        } else {
          const hash = result[0].password;
          bcrypt.compare(body.password, hash, (error, checkpass) => {
            if (error) {
              res.json(error);
            } else if (checkpass === true) {
              const message = {
                message: 'Login successfull',
                token: tokencode,
              };
              res.json(message);
            } else {
              res.json('password salah');
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
