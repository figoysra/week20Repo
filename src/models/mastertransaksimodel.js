/* eslint-disable camelcase */
const db = require('../config/db');

const mastertransaksimodel = {
  getAllData: () => new Promise((resolve, reject) => {
    db.query(
      `select inv.id as id, inv.idUser,
        us.email,us.displayname,
        inv.alamat, inv.payment_method, inv.subTotal, inv.tax, inv.shipping, inv.total  
            from mastertransaksi as inv left join tbl_users as us on inv.idUser=us.id`,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      },
    );
  }),
  getList: (search, field, typeSort, limit, offset) => new Promise((resolve, reject) => {
    db.query(
      `select inv.id as id, inv.idUser,
        us.email,us.displayname,
        inv.alamat, inv.payment_method, inv.subTotal, inv.tax, inv.shipping, inv.total, inv.description  
            from mastertransaksi as inv left join tbl_users as us on inv.idUser=us.id
            where inv.total LIKE '%${search}%' ORDER BY ${field} ${typeSort} LIMIT ${limit} OFFSET ${offset} `,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      },
    );
  }),
  getdetails: (id) => new Promise((resolve, reject) => {
    db.query(
      `select inv.id as id, inv.idUser,
          us.email,us.displayname,
          inv.alamat,inv.inv, inv.payment_method, inv.subTotal, inv.tax, inv.shipping, inv.total, inv.description, inv.date  
              from mastertransaksi as inv left join tbl_users as us on inv.idUser=us.id where inv.idUser=${id}`,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      },
    );
  }),
  // inv: '',
  // alamat: '',
  // payment_method: '',
  // subTotal: '',
  // tax: '',
  // shipping: '',
  // phone: '',
  // total: '',
  // description : '',
  // details: '',
  insert: (body, id) => new Promise((resolve, reject) => {
    const {
      inv, alamat, payment_method, subTotal, tax, shipping, phone, total, description, details,
    } = body;
    // console.log(id)
    db.query(
      `INSERT INTO mastertransaksi (idUser,inv, alamat,payment_method, subTotal,tax, shipping,phone, total, description) 
            value ('${id}',${inv},'${alamat}',${payment_method},'${subTotal}',${tax},${shipping},${phone},${total},'${description}')`,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          details.map((e) => db.query(
            `INSERT INTO detailtransaksi (idProduct, qty, price, idMaster)
                    value (${e.id},'${e.qty}','${e.price}','${result.insertId}')`,
          ));
          resolve(result);
        }
      },
    );
  }),
};

module.exports = mastertransaksimodel;
