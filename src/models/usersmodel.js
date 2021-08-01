const db = require('../config/db');

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
    db.query(`select * from tbl_users where dis_name LIKE '%${search}%' ORDER BY ${field} ${typeSort} LIMIT ${limit} OFFSET ${offset}`, (err, result) => {
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
      } else {
        resolve(result);
      }
    });
  }),
  getdetails: (id) => new Promise((resolve, reject) => {
    db.query(`select * from tbl_users where id='${id}'`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  insert: (data) => new Promise((resolve, reject) => {
    const {
      email, password, photo, dis_name, firstname, lastname, date, gender, address, phone,
    } = data;
    db.query(`INSERT INTO tbl_users (email,password,photo,dis_name,firstname,lastname,date,gender,address,phone) value ('${email}', '${password}','${photo}','${dis_name}', '${firstname}', '${lastname}','${date}','${gender}','${address}',${phone})`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  update: (id, body) => new Promise((resolve, reject) => {
    const {
      email, password, photo, disName, firstname, lastname, date, gender, address, phone,
    } = body;
    db.query(`UPDATE tbl_users SET email = '${email}',password = md5('${password}'),photo='${photo}',dis_name='${disName}',firstname= '${firstname}',lastname= '${lastname}',date='${date}',gender='${gender}',address='${address}',phone=${phone} WHERE id='${id}'`, (err, result) => {
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
