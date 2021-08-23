const db = require('../config/db');

const sizepricemodel = {
  getAllData: () => new Promise((resolve, reject) => {
    db.query('select * from sizeprice', (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  getList: (search, field, typeSort, limit, offset) => new Promise((resolve, reject) => {
    db.query(`select * from sizeprice where price LIKE '%${search}%' ORDER BY ${field} ${typeSort} LIMIT ${limit} OFFSET ${offset}`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  getdetails: (id) => new Promise((resolve, reject) => {
    db.query(`select * from sizeprice where id='${id}'`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  insert: (body) => new Promise((resolve, reject) => {
    const { productID, size, price } = body;
    db.query(`INSERT INTO sizeprice (productID, size, price) value ('${productID}', '${size}', '${price}')`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  update: (id, body) => new Promise((resolve, reject) => {
    const { productID, size, price } = body;
    db.query(`UPDATE sizeprice SET productID ='${productID}', size = '${size}', price = '${price}'  where id = ${id}`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  destroy: (id) => new Promise((resolve, reject) => {
    db.query(`DELETE FROM sizeprice WHERE id=${id}`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
};
module.exports = sizepricemodel;
