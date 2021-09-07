const db = require("../config/db");

const detailtransaksimodel = {
  getAllData: () =>
    new Promise((resolve, reject) => {
      db.query(
        `select det.id, det.idProduct, 
        pro.productName, pro.photo,
        det.qty, det.price, det.idMaster,
        mas.idUser, us.displayname, mas.alamat, mas.payment_method, mas.subtotal,
        mas.tax, mas.shipping, mas.total
        from detailtransaksi as det left join tbl_products as pro on det.idProduct = pro.id
        left join mastertransaksi as mas on det.idMaster = mas.id 
        left join tbl_users as us on mas.idUser = us.id`,
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    }),
  getList: (search, field, typeSort, limit, offset) =>
    new Promise((resolve, reject) => {
      db.query(
        `select det.id, det.idProduct, 
        pro.productName, pro.photo,
        det.qty, det.price, det.idMaster,
        mas.idUser, us.displayname, mas.alamat, mas.payment_method, mas.subtotal,
        mas.tax, mas.shipping, mas.total
        from detailtransaksi as det left join tbl_products as pro on det.idProduct = pro.id
        left join mastertransaksi as mas on det.idMaster = mas.id 
        left join tbl_users as us on mas.idUser = us.id
        where us.displayname LIKE '%${search}%' ORDER BY ${field} ${typeSort} LIMIT ${limit} OFFSET ${offset}`,
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    }),
  getdetails: (id) =>
    new Promise((resolve, reject) => {
      console.log(id)
      db.query(
        `select det.id, det.idProduct, 
        pro.productName, pro.photo,
        det.qty, det.price, det.idMaster,
        mas.idUser, us.displayname, mas.alamat, mas.payment_method, mas.subtotal,
        mas.tax, mas.shipping, mas.total
        from detailtransaksi as det left join tbl_products as pro on det.idProduct = pro.id
        left join mastertransaksi as mas on det.idMaster = mas.id 
        left join tbl_users as us on mas.idUser = us.id where det.idMaster='${id}'`,
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    })
};
module.exports = detailtransaksimodel;
