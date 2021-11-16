const db = require('../config/db');

const detailtransaksimodel = {
  getdetails: (id) => new Promise((resolve, reject) => {
    db.query(
      `select det.id, det.idProduct, 
        pro.productName, pro.photo,
        det.qty, det.price, det.idMaster
        from detailtransaksi as det left join tbl_products as pro on det.idProduct = pro.id
        where det.idMaster='${id}'`,
      (err, result) => {
        if (err) {
          reject(err);
        } else if (result.length <= 0) {
          reject(err);
        } else {
          resolve(result);
        }
      },
    );
  }),
};
module.exports = detailtransaksimodel;
