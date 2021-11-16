const jwt = require('jsonwebtoken');
const db = require('../config/db');
const { JWT_SECRET } = require('../helpers/env');

const usersmodel = {
  getAllData: () => new Promise((resolve, reject) => {
    db.query('select * from tbl_users', (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  getList: (search, field, typeSort, limit, offset) => new Promise((resolve, reject) => {
    db.query(`select * from tbl_users where displayname LIKE '%${search}%' ORDER BY ${field} ${typeSort} LIMIT ${limit} OFFSET ${offset}`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  login: (body) => new Promise((resolve, reject) => {
    const { email } = body;
    db.query(`select * from tbl_users where email = '${email}'`, (err, result) => {
      if (err) {
        reject(err);
      } else if (result.length <= 0) {
        resolve(result);
      } else {
        const user = result[0];
        const payload = {
          id: user.id,
          email: user.email,
        };
        const token = jwt.sign(payload, JWT_SECRET);
        resolve({ result, token });
      }
    });
  }),
  getdetails: (id) => new Promise((resolve, reject) => {
    db.query(`select * from tbl_users where id='${id}'`, (err, result) => {
      if (err) {
        reject(err);
      } else if (result <= 0) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  insert: (data) => new Promise((resolve, reject) => {
    const {
      email, password, photo, displayname, phone, admin,
    } = data;
    db.query(`INSERT INTO tbl_users (email,password,photo,displayname,phone,admin) value ('${email}', '${password}','${photo}','${displayname}',"${phone}",${admin})`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  update: (id, data) => new Promise((resolve, reject) => {
    const {
      email, photo, displayname, firstname, lastname, date, gender, address, phone, admin,
    } = data;
    db.query(`UPDATE tbl_users SET email = '${email}', photo='${photo}',displayname='${displayname}',firstname= '${firstname}',lastname= '${lastname}',date='${date}',gender='${gender}',address='${address}',phone=${phone}, admin=${admin} WHERE id='${id}'`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  destroy: (id) => new Promise((resolve, reject) => {
    db.query(`DELETE FROM tbl_users WHERE id=${id}`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
};
module.exports = usersmodel;
